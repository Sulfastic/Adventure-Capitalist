import * as PIXI from 'pixi.js';

import viewStore from '../../data/viewStore';
import Button from '../Button';

export default class WelcomeScreen extends PIXI.Container {
  constructor(onComplete) {
    super();

    this._init(onComplete);
  }

  _init(onComplete) {
    this._onCompleteCallback = onComplete;
    this._background = this._createBackground();
    this._welcomeText = this._createWelcomeText();
    this._continueButton = this._createContinueButton();
  }

  _createBackground() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xfcca03);
    graphics.drawRect(0, 0, viewStore.screenSize.width, viewStore.screenSize.height);
    graphics.endFill();

    return this.addChild(graphics);
  }

  _createWelcomeText() {
    const text = new PIXI.Text(this._getWelcomeText(), this._getWelcomeStyle());
    text.anchor.set(0.5);
    text.position.set(viewStore.screenSize.width * 0.5, viewStore.screenSize.height * 0.5);

    return this.addChild(text);
  }

  _createContinueButton() {
    const button = new Button('red_button', this._onCompleteCallback, 'Continue');
    button.anchor.set(0.5);
    button.position.set(viewStore.screenSize.width * 0.5, viewStore.screenSize.height * 0.65);

    return this.addChild(button);
  }

  // eslint-disable-next-line class-methods-use-this
  _getWelcomeText() {
    return 'Welcome to the Adventure Capitalist game,\n press the button below to continue';
  }

  // eslint-disable-next-line class-methods-use-this
  _getWelcomeStyle() {
    return {
      align: 'center',
    };
  }
}
