import { GameObjects } from 'phaser';
import { TEXTURES } from '../constants';

export default class Background extends GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture || TEXTURES.BACKGROUND, frame);

    scene.add.existing(this);
  }

  init() {
    const { game } = this.scene;

    this.displayWidth = game.config.width + 100;
    this.displayHeight = game.config.height + 100;
    this.setOrigin(0, 0);

    return this;
  }
}
