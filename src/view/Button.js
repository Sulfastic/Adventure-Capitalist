import * as PIXI from 'pixi.js';

import viewStore from '../data/viewStore';

export default class Button extends PIXI.Container {
  constructor(name, clickHandler, text = '') {
    super();

    this._init(name, clickHandler, text);
  }

  enable() {
    this.alpha = 1;
    this.buttonMode = true;
    this.interactive = true;
  }

  disable() {
    this.alpha = 0.75;
    this.buttonMode = false;
    this.interactive = false;
  }

  tap() {
    this.click();
  }

  click() {
    this._clickHandler();
  }

  mouseover() {
    this.image.tint = 0xfad2b7;
  }

  touchend() {
    this.mouseout();
  }

  mouseout() {
    this.image.tint = 0xffffff;
  }

  mouseup() {
    this.image.tint = 0xfad2b7;
    this.image.scale.set(1);
  }

  touchstart() {
    this.mousedown();
  }

  mousedown() {
    this.image.tint = 0xd75f0f;
    this.image.scale.set(0.95);
  }

  _init(name, clickHandler, text) {
    this._name = name;
    this._clickHandler = clickHandler;
    this._text = text;

    this.container = this.addChild(new PIXI.Container());
    this.image = this._createImage();
    this.text = this._createText();

    this.interactive = true;
    this.anchor = new PIXI.ObservablePoint(() => this._onAnchorChanged(), 0, 0);
  }

  _createImage() {
    const image = new PIXI.Sprite(viewStore.texturesCache[this._name].texture);
    image.anchor.set(0.5);

    return this.container.addChild(image);
  }

  _createText() {
    const text = new PIXI.Text(this._text, this._getTextStyle());
    text.anchor.set(0.5);

    return this.container.addChild(text);
  }

  // eslint-disable-next-line class-methods-use-this
  _getTextStyle() {
    return {};
  }

  _onAnchorChanged() {
    this.pivot.set(this.container.width * this.anchor.x, this.container.height * this.anchor.y);
    this.container.position.set(this.width * 0.5, this.height * 0.5);
  }
}
