export default class BaseFrameView extends PIXI.Container {
  constructor(template) {
    super();

    this._init(template);
  }

  _init(template) {
    this._template = template;
    this._frame = this._createFrame();
    this._name = this._createName();
  }

  _createFrame(color = 0xac4c13) {
    const frame = new PIXI.Graphics();
    frame.beginFill(color);
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

  _createName() {
    const text = new PIXI.Text(this._template.name, {});
    text.anchor.set(0, 0.5);
    text.position.set(-25, -45);

    return this.addChild(text);
  }
}
