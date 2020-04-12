import { GameObjects } from 'phaser';
import { TEXTURES } from '../constants';
import { getPreference } from '../services/preferences';

export default class Pole extends GameObjects.Sprite {
  constructor(scene, platformManager) {
    const bounds = platformManager.getMainPlatform().getBounds();
    const x = bounds.right - getPreference('poleWidth');
    const y = bounds.top;

    super(scene, x, y, TEXTURES.TILE);

    scene.add.existing(this);
    this.platformManager = platformManager;
  }

  init() {
    this.setOrigin(1, 1);

    this.displayWidth = getPreference('poleWidth');
    this.displayHeight = getPreference('poleWidth');

    return this;
  }

  fallDown() {
    const { tweens } = this.scene;

    tweens.add({
      targets: [this],
      angle: 180,
      duration: getPreference('poleRotateTime'),
      ease: 'Cubic.easeIn',
    });
  }

  rearange() {
    this.angle = 1;
    this.alpha = 1;
    this.x = this.platformManager.getMainPlatform().getBounds().right - getPreference('poleWidth');
    this.displayHeight = getPreference('poleWidth');
  }
}
