import * as PIXI from 'pixi.js';

import BusinessPanel from './BusinessPanel';
import viewStore from '../../data/viewStore';

export default class GameScreen extends PIXI.Container {
  constructor() {
    super();

    this._init();
  }

  _init() {
    this._background = this._createBackground();
    this._businessPanel = this._createBusinessPanel();
  }

  _createBackground() {
    // eslint-disable-next-line dot-notation
    const background = new PIXI.Sprite(viewStore.texturesCache['market'].texture);
    background.anchor.set(0.5);

    return this.addChild(background);
  }

  _createBusinessPanel() {
    const panel = new BusinessPanel();
    panel.position.set(viewStore.screenSize.width * 0.5, viewStore.screenSize.height * 0.5);

    return this.addChild(panel);
  }
}
