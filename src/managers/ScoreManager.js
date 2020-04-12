import { FONTS, STORAGE } from '../constants';

export default class ScoreManager {
  constructor({ scene, platformManager, energyManager, group }) {
    this.scene = scene;
    this.platformManager = platformManager;
    this.energyManager = energyManager;
    this.group = group;
  }

  init() {
    this.score = 0;
    this.bestScore = Number(localStorage.getItem(STORAGE.SCORE)) || 0;
    const energyBounds = this.energyManager.energyBar.getBounds();

    this.scoreText = this.scene.add.bitmapText(
      energyBounds.right,
      energyBounds.top - 40,
      FONTS.MAIN_FONT,
      `DISTANCIA: ${this.score.toString()}`
    );
    this.group.add(this.scoreText);
    this.scoreText.setOrigin(1, 0);

    this.bestScoreText = this.scene.add.bitmapText(
      energyBounds.left,
      energyBounds.bottom + 10,
      FONTS.MAIN_FONT,
      `DISTANCIA MAXIMA: ${this.bestScore.toString()}`
    );
    this.group.add(this.bestScoreText);
    this.bestScoreText.setOrigin(0, 0);

    return this;
  }

  show() {}

  updateScore() {
    this.scoreText.setText(`DISTANCIA: ${this.score.toString()}`);
  }

  updateBestScore() {
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      this.bestScoreText.setText(`DISTANCIA MAXIMA: ${this.bestScore.toString()}`);
      localStorage.setItem(STORAGE.SCORE, this.bestScore);
    }
  }

  increment() {
    this.score += 1;
    this.updateScore();
    this.updateBestScore();
  }
}
