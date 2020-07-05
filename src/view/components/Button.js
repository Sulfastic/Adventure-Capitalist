import sound from 'pixi-sound';

import viewStore from '../../data/view/viewStore';

export default class Button extends PIXI.Container {
  constructor(name, clickHandler, text = '') {
    super();

    this._init(name, clickHandler, text);
  }

  setBaseScale(baseScale) {
    this._baseScale = baseScale;
    this.image.scale.set(baseScale);
  }

  enable() {
    this.alpha = 1;
    this.buttonMode = true;
    this.interactive = true;
  }

  disable() {
    this.alpha = 0.65;
    this.buttonMode = false;
    this.interactive = false;
    this.mouseout();
  }

  tap() {
    this.click();
  }

  click() {
    this._clickHandler();
    sound.play('click1', {loop: false});
  }

  mouseover() {
    this.image.tint = 0xfad2b7;
  }

  touchend() {
    this.mouseout();
  }

  mouseout() {
    this.image.tint = 0xffffff;
    this.image.scale.set(this._baseScale);
  }

  mouseup() {
    this.image.tint = 0xfad2b7;
    this.image.scale.set(this._baseScale);
  }

  touchstart() {
    this.mousedown();
  }

  mousedown() {
    this.image.tint = 0xd75f0f;
    this.image.scale.set(this._baseScale - 0.045);
  }

  _init(name, clickHandler, text) {
    this._name = name;
    this._clickHandler = clickHandler;
    this._text = text;
    this._baseScale = 1;

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
    const text = new PIXI.Text(this._text);
    text.anchor.set(0.5);
    text.position.x = -1; // default button texture is not evenly placed on canvas :/

    return this.container.addChild(text);
  }

  _onAnchorChanged() {
    this.pivot.set(this.container.width * this.anchor.x, this.container.height * this.anchor.y);
    this.container.position.set(this.width * 0.5, this.height * 0.5);
  }
}
