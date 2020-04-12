import EnergyStatus from '../sprites/EnergyStatus';
import { getPreference } from '../services/preferences';
import EnergyBar from '../sprites/EnergyBar';

export default class EnergyManager {
  constructor({ scene, platformManager, player, pole, group }) {
    this.scene = scene;
    this.platformManager = platformManager;
    this.player = player;
    this.pole = pole;
    this.group = group;
  }

  init() {
    this.timeLeft = getPreference('initialTime');
    this.energyBar = new EnergyBar({ scene: this.scene }).init();
    this.group.add(this.energyBar);

    const energyBounds = this.energyBar.getBounds();

    this.energyStatus = new EnergyStatus({
      scene: this.scene,
      x: energyBounds.left + 5,
      y: energyBounds.top + 5,
    }).init();
    this.group.add(this.energyStatus);
    this.energyStatus.setOrigin(0, 0);
    this.energyStatus.displayWidth = 500;
    this.energyStatus.displayHeight = energyBounds.height - 10;

    return this;
  }

  removeTimer() {
    this.gameTimer.remove();
  }

  addGameTimer() {
    this.gameTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLeft--;
        this.updateTimer();
      },
      loop: true,
    });
  }

  updateTimer() {
    const { tweens } = this.scene;
    this.energyStatus.displayWidth = (500 * this.timeLeft) / getPreference('initialTime');

    if (this.timeLeft <= 0) {
      tweens.killTweensOf(this.player);
      tweens.killTweensOf(this.pole);
      this.player.fallAndDie();
    }
  }

  addEnergy() {
    let actualTime = this.timeLeft + getPreference('initialTime');
    this.timeLeft = Math.min(actualTime, getPreference('initialTime'));
  }
}
