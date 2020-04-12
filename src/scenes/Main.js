import { Player } from '../sprites';
import { FONTS, POLE_STATUS, SCENES, SOUNDS, STATES, TEXTURES } from '../constants';
import { Scene } from 'phaser';
import Background from '../sprites/Background';
import PlatformManager from '../managers/PlatformManager';
import Pole from '../sprites/Pole';
import Clouds from '../sprites/Clouds';
import { getPreference } from '../services/preferences';
import ScoreManager from '../managers/ScoreManager';
import EnergyManager from '../managers/EnergyManager';
import SoundManager from '../managers/SoundManager';

export default class Main extends Scene {
  constructor() {
    super({
      key: SCENES.MAIN,
    });
  }

  create() {
    this.firstMove = true;

    this.ui = this.add.group();

    this.background = new Background(this, -50, -50).init();

    this.mainPlatform = 0;

    this.platformManager = new PlatformManager(this).init();

    this.pole = new Pole(this, this.platformManager).init();

    this.soundManager = new SoundManager(this).init();

    this.player = new Player({
      scene: this,
      platformManager: this.platformManager,
      pole: this.pole,
      nextPlatform: this.nextPlatform,
      soundManager: this.soundManager,
      onDie: () => this.showGameOver(),
    }).init();

    this.cloudsManager = new Clouds(this).init();

    this.addInfo();

    this.state = STATES.WAITING_FOR_INPUT;

    this.input.on('pointerdown', this.handlePointerDown, this);
    this.input.on('pointerup', this.handlePointerUp, this);
  }

  handlePointerDown() {
    if (this.state === STATES.WAITING_FOR_INPUT) {
      this.state = STATES.WAITING_FOR_INPUT_END;
      let platformGap = getPreference('platformGapRange[1]');
      let maxPoleWidth = platformGap + platformGap;

      this.soundManager.playSound(SOUNDS.GROW);

      this.growTween = this.tweens.add({
        targets: [this.pole],
        displayHeight: maxPoleWidth + 50,
        duration: getPreference('poleGrowTime'),
        onComplete: () => this.soundManager.stopSound(SOUNDS.GROW),
      });

      if (this.firstMove) {
        this.firstMove = false;
        this.info.visible = false;

        this.energyManager = new EnergyManager({
          scene: this,
          platformManager: this,
          player: this.player,
          pole: this.pole,
          group: this.ui,
        }).init();

        this.energyManager.addGameTimer();

        this.scoreManager = new ScoreManager({
          scene: this,
          platformManager: this.platformManager,
          energyManager: this.energyManager,
          group: this.ui,
        }).init();
      }
    }
  }

  handlePointerUp() {
    if (this.state === STATES.WAITING_FOR_INPUT_END) {
      this.state = STATES.IDDLE;

      let soundManager = this.soundManager;
      soundManager.stopSound(SOUNDS.GROW);
      soundManager.playSound(SOUNDS.STICK);

      this.growTween.stop();

      this.tweens.add({
        targets: [this.pole],
        angle: 90,
        duration: getPreference('poleRotateTime'),
        ease: 'Bounce.easeOut',
        onComplete: () => {
          let poleBounds = this.pole.getBounds();
          let platformBounds = this.platformManager.getRightPlatform().getBounds();
          let dangerBounds = this.platformManager.dangerZone.getBounds();

          // If we hit the danger zone
          if (poleBounds.right >= dangerBounds.left && poleBounds.right <= dangerBounds.right) {
            soundManager.playSound(SOUNDS.PICK);
            this.platformManager.showExtraTimePick();
            this.energyManager.addEnergy();
          }

          let poleStatus = POLE_STATUS.SUCCESSFUL;

          if (poleBounds.right < platformBounds.left) {
            poleStatus = POLE_STATUS.TOO_SHORT;
          } else if (poleBounds.right > platformBounds.right) {
            poleStatus = POLE_STATUS.TOO_LONG;
          }

          this.player.walkThroughPole(poleStatus);
        },
      });
    }
  }

  nextPlatform() {
    this.player.goIddle();
    let mainPlatform = this.platformManager.getMainPlatform();
    this.player.y = mainPlatform.getBounds().top;
    this.platformManager.hideDangerZone();
    let rightPlatform = this.platformManager.getRightPlatform();
    let rightPlatformPosition = rightPlatform.x;
    let distance = rightPlatform.x - mainPlatform.x;

    this.tweens.add({
      targets: [this.player, this.pole, mainPlatform, rightPlatform],
      props: {
        x: {
          value: `-= ${distance}`,
        },
        alpha: {
          value: {
            getEnd: target => (target.x < rightPlatformPosition ? 0 : 1),
          },
        },
      },
      duration: getPreference('scrollTime'),
      onComplete: () => this.prepareNextMove(),
    });
  }

  prepareNextMove() {
    this.scoreManager.increment();
    this.platformManager.rearangePlatforms();
    this.pole.rearange();

    this.state = STATES.WAITING_FOR_INPUT;
  }

  addInfo() {
    let info = this.add.bitmapText(
      this.game.config.width / 2,
      this.game.config.height / 5,
      FONTS.MAIN_FONT,
      `SEGURE O DEDO/BOTAO DO MOUSE NA TELA\nPARA ALONGAR O PALITO\nE CHEGAR A PROXIMA PLATAFORMA`,
      35,
      1
    );
    this.info = info;
    info.setOrigin(0.5, 0.5);
  }

  showGameOver() {
    this.energyManager.removeTimer();
    let halfGameWidth = this.game.config.width / 2;
    let buttonsY = this.game.config.height + 150;
    let restartIcon = this.add.sprite(halfGameWidth - 120, buttonsY, TEXTURES.ICONS);

    let homeIcon = this.add.sprite(halfGameWidth + 120, buttonsY, TEXTURES.ICONS);

    homeIcon.setFrame(1);

    this.tweens.add({
      targets: [
        this.platformManager.dangerZone,
        this.pole,
        this.platformManager.getMainPlatform(),
        this.platformManager.getRightPlatform(),
      ],
      alpha: 0,
      duration: 800,
      ease: 'Cubic.easeIn',
    });

    this.tweens.add({
      targets: [homeIcon, restartIcon],
      y: this.game.config.height / 2,
      duration: 800,
      ease: 'Cubic.easeIn',
      onComplete: () => {
        restartIcon.setInteractive();
        restartIcon.on('pointerup', () => {
          this.soundManager.playSound(SOUNDS.CLICK);
          this.scene.start(SCENES.MAIN);
        });

        homeIcon.setInteractive();
        homeIcon.on('pointerup', () => {
          this.soundManager.playSound(SOUNDS.CLICK);
          this.scene.start(SCENES.MENU);
        });
      },
    });
  }

  update() {}
}
