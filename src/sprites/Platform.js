import { GameObjects } from 'phaser';
import { TEXTURES } from '../constants';
import { getPreference } from '../services/preferences';

const xHandler = {
  0: ({ game }) => (game.config.width - getPreference('defaultSize.width')) / 2,
  1: ({ game }) => game.config.width,
};

const yHandler = {
  default: ({ game }) => game.config.height * getPreference('platformHeight'),
};

export default class Platform extends GameObjects.Sprite {
  constructor(index, mainIndex, scene) {
    let x = xHandler[index]({ game: scene.game });
    let y = yHandler.default({ game: scene.game });

    super(scene, x, y, TEXTURES.TILE);

    this.index = index;
    this.mainIndex = mainIndex;

    scene.add.existing(this);
  }

  init() {
    const { game } = this.scene;

    this.displayWidth =
      (getPreference('platformWidthRange[0]') + getPreference('platformWidthRange[1]')) / 2;

    this.displayHeight = game.config.height * (1 - getPreference('platformHeight')) + 50;

    this.setOrigin(0, 0);

    return this;
  }

  tween() {}
}
