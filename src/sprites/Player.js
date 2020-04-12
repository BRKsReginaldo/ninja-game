import { ANIMATIONS, POLE_STATUS, SOUNDS, TEXTURES } from '../constants';
import { GameObjects } from 'phaser';
import { getPreference } from '../services/preferences';

export default class Player extends GameObjects.Sprite {
  constructor({ scene, platformManager, pole, nextPlatform, onDie, soundManager }) {
    let bounds = platformManager.getMainPlatform().getBounds();
    let x = bounds.right - getPreference('poleWidth');
    let y = bounds.top;

    super(scene, x, y, TEXTURES.HERO);

    scene.add.existing(this);
    this.onDie = onDie;
    this.setOrigin(1, 1);
    this.platformManager = platformManager;
    this.pole = pole;
    this.nextPlatform = nextPlatform;
    this.soundManager = soundManager;
  }

  init() {
    const { anims } = this.scene;

    anims.create({
      key: ANIMATIONS.IDLE,
      frames: anims.generateFrameNumbers(TEXTURES.HERO, {
        start: 0,
        end: 11,
      }),
      frameRate: 15,
      repeat: -1,
    });

    anims.create({
      key: ANIMATIONS.RUN,
      frames: anims.generateFrameNumbers(TEXTURES.HERO, {
        start: 12,
        end: 19,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.play(ANIMATIONS.IDLE);

    return this;
  }

  walkThroughPole(poleStatus) {
    const { tweens } = this.scene;
    const { soundManager } = this;
    let platformBounds = this.platformManager.getRightPlatform().getBounds();
    let heroBounds = this.getBounds();
    let poleBounds = this.pole.getBounds();

    let heroDestination = {
      [POLE_STATUS.SUCCESSFUL]: () => platformBounds.right - getPreference('poleWidth'),
      [POLE_STATUS.TOO_SHORT]: () => poleBounds.right,
      [POLE_STATUS.TOO_LONG]: () => poleBounds.right + heroBounds.width / 2,
    }[poleStatus]();

    this.anims.play(ANIMATIONS.RUN);
    soundManager.playSound(SOUNDS.RUN);

    this.walkTween = tweens.add({
      targets: [this],
      x: heroDestination,
      duration: getPreference('heroWalkTime') * this.pole.displayHeight,
      onComplete: () => {
        soundManager.stopSound(SOUNDS.RUN);

        const decisions = {
          [POLE_STATUS.SUCCESSFUL]: this.nextPlatform.bind(this.scene),
          [POLE_STATUS.TOO_LONG]: () => this.fallAndDie(),
          [POLE_STATUS.TOO_SHORT]: () => {
            this.pole.fallDown();
            this.fallAndDie();
          },
        };

        decisions[poleStatus]();
      },
      onUpdate: () => {
        let heroBounds = this.getBounds();
        let poleBounds = this.pole.getBounds();
        let platformBounds = this.platformManager.getRightPlatform().getBounds();

        if (heroBounds.centerX > poleBounds.left && heroBounds.centerX < poleBounds.right) {
          this.y = poleBounds.top;
        } else {
          this.y = platformBounds.top;
        }
      },
    });
  }

  goIddle() {
    this.anims.play(ANIMATIONS.IDLE);
  }

  fallAndDie() {
    const { cameras, tweens, game } = this.scene;
    this.soundManager.playSound(SOUNDS.DEATH, {
      delay: getPreference('heroFallTime') / 2000,
    });

    tweens.add({
      targets: [this],
      y: game.config.height + this.displayHeight * 2,
      angle: 180,
      duration: getPreference('heroFallTime'),
      ease: 'Cubic.easeIn',
      onComplete: () => {
        cameras.main.shake(200, 0.01);
        this.onDie();
      },
    });
  }
}
