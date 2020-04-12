import { FONTS, SCENES, SOUNDS, TEXTURES } from '../constants';
import { Scene } from 'phaser';

export default class Boot extends Scene {
  constructor() {
    super({ key: SCENES.BOOT });
  }

  preload() {
    const { load } = this;
    load.image(TEXTURES.BACKGROUND, require('../assets/sprites/background.png'));
    load.image(TEXTURES.TILE, require('../assets/sprites/tile.png'));
    load.image(TEXTURES.DANGER_TILE, require('../assets/sprites/dangertile.png'));
    load.image(TEXTURES.TITLE, require('../assets/sprites/title.png'));
    load.image(TEXTURES.INFO, require('../assets/sprites/info.png'));
    load.image(TEXTURES.PLAY_BUTTON, require('../assets/sprites/playbutton.png'));
    load.image(TEXTURES.CLOCK, require('../assets/sprites/clock.png'));
    load.image(TEXTURES.ENERGY_BAR, require('../assets/sprites/energybar.png'));
    load.image(TEXTURES.WHITE_TILE, require('../assets/sprites/whitetile.png'));

    load.spritesheet(TEXTURES.CLOUD, require('../assets/sprites/cloud.png'), {
      frameWidth: 256,
      frameHeight: 256,
    });
    load.spritesheet(TEXTURES.HERO, require('../assets/sprites/hero.png'), {
      frameWidth: 77,
      frameHeight: 97,
    });
    load.spritesheet(TEXTURES.ICONS, require('../assets/sprites/icons.png'), {
      frameWidth: 150,
      frameHeight: 150,
    });

    load.bitmapFont(
      FONTS.MAIN_FONT,
      require('../assets/fonts/font.png'),
      require('../assets/fonts/font.fnt')
    );

    load.audio(SOUNDS.DEATH, [
      require('../assets/sounds/death.mp3'),
      require('../assets/sounds/death.ogg'),
    ]);
    load.audio(SOUNDS.RUN, [
      require('../assets/sounds/run.mp3'),
      require('../assets/sounds/run.ogg'),
    ]);
    load.audio(SOUNDS.STICK, [
      require('../assets/sounds/stick.mp3'),
      require('../assets/sounds/stick.ogg'),
    ]);
    load.audio(SOUNDS.GROW, [
      require('../assets/sounds/grow.mp3'),
      require('../assets/sounds/grow.ogg'),
    ]);
    load.audio(SOUNDS.PICK, [
      require('../assets/sounds/pick.mp3'),
      require('../assets/sounds/pick.ogg'),
    ]);
    load.audio(SOUNDS.CLICK, [
      require('../assets/sounds/click.mp3'),
      require('../assets/sounds/click.ogg'),
    ]);
  }

  create() {
    this.scene.start(SCENES.MENU);
  }
}
