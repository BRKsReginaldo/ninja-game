import { getPreference } from '../services/preferences';
import { SOUNDS } from '../constants';

export default class SoundManager {
  constructor(scene) {
    this.scene = scene;
  }

  init() {
    const { scene } = this;

    this.sounds = {};

    Object.values(SOUNDS).forEach(soundKey => {
      this.sounds[soundKey] = scene.sound.add(soundKey);
    });

    return this;
  }

  playSound(soundKey, options) {
    if (getPreference('soundOn')) {
      const sound = this.sounds[soundKey];
      sound.play('', options);
    }
  }

  stopSound(soundKey) {
    const sound = this.sounds[soundKey];
    sound.stop();
  }
}
