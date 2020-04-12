import Phaser from 'phaser';
import Platform from '../sprites/Platform';
import { getPreference } from '../services/preferences';
import { TEXTURES } from '../constants';
import Clock from '../sprites/Clock';

export default class PlatformManager {
  constructor(scene) {
    this.scene = scene;
    this.mainPlatform = 0;
    this.platforms = [
      new Platform(0, this.mainPlatform, scene).init(),
      new Platform(1, this.mainPlatform, scene).init(),
    ];
  }

  init() {
    this.addDangerZone();
    this.tweenPlatforms();

    return this;
  }

  getMainPlatform() {
    return this.platforms[this.mainPlatform];
  }

  getRightPlatform() {
    return this.platforms[1 - this.mainPlatform];
  }

  tweenPlatforms() {
    const { tweens } = this.scene;

    let rightBound = this.getMainPlatform().getBounds().right;

    let [minGap, maxGap] = getPreference('platformGapRange');
    let gap = Phaser.Math.Between(minGap, maxGap);

    let destination = rightBound + gap;

    let [minWidth, maxWidth] = getPreference('platformWidthRange');
    let width = Phaser.Math.Between(minWidth, maxWidth);

    this.getRightPlatform().displayWidth = width;

    tweens.add({
      targets: [this.getRightPlatform()],
      x: destination,
      duration: getPreference('scrollTime'),
      onComplete: () => this.placeDangerZone(),
    });
  }

  addDangerZone() {
    const { scene } = this;
    let dangerZone = scene.add.sprite(0, this.getMainPlatform().y, TEXTURES.DANGER_TILE);
    this.dangerZone = dangerZone;
    dangerZone.setOrigin(0, 0);
    dangerZone.displayWidth = getPreference('dangerZoneWidth');
    dangerZone.displayHeight = 10;
    dangerZone.visible = false;

    this.extraTime = new Clock(scene, 0, 0);
    this.extraTime.visible = false;
  }

  placeDangerZone() {
    let dangerZone = this.dangerZone;
    dangerZone.visible = true;
    let rightPlatform = this.getRightPlatform();
    let platformBound = rightPlatform.getBounds().right;

    if (Phaser.Math.Between(0, 1) === 0) {
      dangerZone.x = rightPlatform.x;
    } else {
      dangerZone.x = platformBound - getPreference('dangerZoneWidth');
    }

    this.extraTime.x = dangerZone.getBounds().centerX;
    this.extraTime.alpha = 1;
    this.extraTime.y = this.getMainPlatform().y - 30;
    this.extraTime.visible = false;
  }

  hideDangerZone() {
    this.dangerZone.visible = false;
  }

  rearangePlatforms() {
    const mainPlatform = this.getMainPlatform();
    mainPlatform.x = this.scene.game.config.width;
    mainPlatform.alpha = 1;
    this.mainPlatform = 1 - this.mainPlatform;
    this.tweenPlatforms();
  }

  showExtraTimePick() {
    this.extraTime.visible = true;
    this.timeTween = this.scene.tweens.add({
      targets: [this.extraTime],
      y: this.extraTime.y - 100,
      alpha: 0,
      duration: 500,
    });
  }
}
