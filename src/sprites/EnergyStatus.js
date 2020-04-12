import { GameObjects } from 'phaser';
import { TEXTURES } from '../constants';

export default class EnergyStatus extends GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, TEXTURES.WHITE_TILE);

    scene.add.existing(this);
  }

  init() {
    return this;
  }
}
