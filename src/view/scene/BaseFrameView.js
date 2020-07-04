import * as PIXI from 'pixi.js';

export default class BaseFrameView extends PIXI.Container {
  constructor(template) {
    super();

    this._init(template);
  }

  _init(template) {
    this._frame = this._createFrame();
    this._name = this._createName(template.name);
  }

  _createFrame() {
    const frame = new PIXI.Graphics();
    frame.beginFill(0xac4c13);
    frame.drawRoundedRect(
      0,
      0,
      320,
      90,
      20,
    );
    frame.endFill();
    frame.position.set(-40, -60);

    return this.addChild(frame);
  }

  _createName(name) {
    const text = new PIXI.Text(name, {});
    text.anchor.set(0, 0.5);
    text.y = -45;

    return this.addChild(text);
  }
}
