import './index.css';
import { Boot, Main } from './scenes';
import Phaser from 'phaser';
import { getPreference } from './services/preferences';
import Menu from './scenes/Menu';
// import * as serviceWorker from './serviceWorker';

window.addEventListener('load', () => {
  let width = getPreference('defaultSize.width');
  let height = getPreference('defaultSize.height');
  let perfectRatio = width / height;
  let innerWidth = window.innerWidth;
  let innerHeight = window.innerHeight;
  let actualRatio = Math.min(innerWidth / innerHeight, getPreference('defaultSize.maxRatio'));

  if (perfectRatio > actualRatio) {
    height = width / actualRatio;
  } else {
    width = height * actualRatio;
  }

  const config = {
    width: width,
    height: height,
    title: 'NINJA IRRESPONSAVEL',
    // the following 2 values are from `package.json`
    url: process.env.HOMEPAGE,
    version: process.env.VERSION,
    scene: [Boot, Menu, Main],
    disableContextMenu: true,
    backgroundColor: 0x132c43,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'game-container',
      width,
      height,
    },
  };

  new Phaser.Game(config);
  window.focus();
});
