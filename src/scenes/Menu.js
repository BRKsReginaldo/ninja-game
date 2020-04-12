import { Scene } from 'phaser';
import { SCENES, SOUNDS, TEXTURES } from '../constants';
import SoundManager from '../managers/SoundManager';

export default class Menu extends Scene {
  constructor() {
    super({
      key: SCENES.MENU,
    });
  }

  create() {
    let soundManager = new SoundManager(this).init();
    let background = this.add.sprite(0, 0, TEXTURES.TILE);
    background.setOrigin(0, 0);
    let game = this.game;
    let config = game.config;
    background.displayWidth = config.width;
    background.displayHeight = config.height;

    let title = this.add.sprite(config.width / 2, 50, TEXTURES.TITLE);
    title.setOrigin(0.5, 0);

    let playButtonX = config.width / 2;
    let playButtonY = config.height / 2 - 20;
    let playButton = this.add.sprite(playButtonX, playButtonY, TEXTURES.PLAY_BUTTON);

    playButton.setInteractive();

    playButton.on('pointerup', () => {
      this.cameras.main.flash();
      soundManager.playSound(SOUNDS.CLICK);
      this.scene.start(SCENES.MAIN);
    });
  }
}
