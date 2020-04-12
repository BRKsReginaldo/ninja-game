export const ANIMATIONS = {
  IDLE: '@ANIMATIONS/IDLE',
  RUN: '@ANIMATIONS/RUN',
};

export const SCENES = {
  BOOT: '@SCENES/BOOT',
  MAIN: '@SCENES/MAIN',
  MENU: '@SCENES/MENU',
};

export const TEXTURES = {
  BACKGROUND: '@TEXTURES/BACKGROUND',
  CLOCK: '@TEXTURES/CLOCK',
  CLOUD: '@TEXTURES/CLOUD',
  DANGER_TILE: '@TEXTURES/DANGER_TILE',
  ENERGY_BAR: '@TEXTURES/ENERGY_BAR',
  HERO: '@TEXTURES/HERO',
  ICONS: '@TEXTURES/ICONS',
  INFO: '@TEXTURES/INFO',
  PLAY_BUTTON: '@TEXTURES/PLAY_BUTTON',
  TILE: '@TEXTURES/TILE',
  TITLE: '@TEXTURES/TITLE',
  WHITE_TILE: '@TEXTURES/WHITE_TILE',
};

export const FONTS = {
  MAIN_FONT: '@FONTS/MAIN_FONT',
};

export const SOUNDS = {
  CLICK: '@SOUNDS/CLICK',
  DEATH: '@SOUNDS/DEATH',
  GROW: '@SOUNDS/GROW',
  PICK: '@SOUNDS/PICK',
  RUN: '@SOUNDS/RUN',
  STICK: '@SOUNDS/STICK',
};

export const STORAGE = {
  SCORE: '@irresponsible/score',
  PREFERENCES: '@irresponsible/preferences',
};

export const STATES = {
  IDDLE: '@STATES/IDDLE',
  WAITING_FOR_INPUT: '@STATES/WAITING_FOR_INPUT',
  WAITING_FOR_INPUT_END: '@STATES/WAITING_FOR_INPUT_END',
};

export const POLE_STATUS = {
  SUCCESSFUL: '@POLE_STATUS/SUCCESSFUL',
  TOO_SHORT: '@POLE_STATUS/TOO_SHORT',
  TOO_LONG: '@POLE_STATUS/TOO_LONG',
};

export const DEFAULT_PREFERENCES = {
  defaultSize: {
    width: 750,
    height: 1334,
    maxRatio: 4 / 3,
  },
  platformGapRange: [50, 150],
  platformWidthRange: [50, 150],
  scrollTime: 250,
  platformHeight: 0.6,
  dangerZoneWidth: 30,
  poleWidth: 8,
  poleGrowTime: 400,
  poleRotateTime: 500,
  heroWalkTime: 2,
  heroFallTime: 500,
  showGUI: true,
  bonusTime: 3,
  initialTime: 30,
  soundOn: true,
};

export default {
  ANIMATIONS,
  SCENES,
  TEXTURES,
};
