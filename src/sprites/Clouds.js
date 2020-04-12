import Cloud from './Cloud';
import Phaser from 'phaser';

export default class Clouds {
	constructor(scene) {
		this.scene = scene;
	}

	init() {
		const { game } = this.scene;
		let clouds = Math.ceil(game.config.width / 128);
		let cloudsArray = [];

		for (let i = 0; i <= 1; i++) {
			for (let j = 0; j < clouds; j++) {
				let cloud = new Cloud(
					this.scene,
					128 * j + Phaser.Math.Between(-10, 10),
					game.config.height + i * 32 + Phaser.Math.Between(-10, 10),
					null,
					i
				);

				cloudsArray.push(cloud);
			}
		}

		this.clouds = cloudsArray;
		this.tweenClouds();
	}

	tweenClouds() {
		const { tweens } = this.scene;

		const cloudMovement = attribute => ({
			[attribute]: {
				value: {
					getEnd: target => target[attribute] + Phaser.Math.Between(-10, 10),
				},
			},
		});

		tweens.add({
			targets: this.clouds,
			props: {
				...cloudMovement('x'),
				...cloudMovement('y'),
			},
			duration: 3000,
			repeat: -1,
			yoyo: true,
		});
	}
}
