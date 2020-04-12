import { GameObjects } from 'phaser';
import { TEXTURES } from '../constants';

export default class EnergyBar extends GameObjects.Sprite {
  constructor({ scene }) {
    super(scene, scene.game.config.width / 2, scene.game.config.height / 5, TEXTURES.ENERGY_BAR);

    scene.add.existing(this);
  }

  init() {
    return this;
  }
}
