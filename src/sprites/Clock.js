import { GameObjects } from 'phaser';
import { TEXTURES } from '../constants';

export default class Clock extends GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, TEXTURES.CLOCK);

    scene.add.existing(this);
  }

  init() {
    return this;
  }
}
