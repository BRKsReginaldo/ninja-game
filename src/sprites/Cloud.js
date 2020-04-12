import { GameObjects } from 'phaser';
import { TEXTURES } from '../constants';

export default class Cloud extends GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || TEXTURES.CLOUD, frame);

		scene.add.existing(this);
	}

	init() {
		return this;
	}
}
