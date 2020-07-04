import user from '../../../data/user/UserData';

export default class UserStatusFrame extends PIXI.Container {
  constructor() {
    super();

    this._init();
  }

  updateTransform() {
    super.updateTransform();
    this._statusText.text = user;
  }

  _init() {
    this._frame = this._createFrame();
    this._statusText = this._createStatusText();
  }

  _createFrame() {
    const frame = new PIXI.Graphics();
    frame.beginFill(0xfbe6d4);
    frame.drawRoundedRect(
      0,
      0,
      650,
      90,
      20,
    );
    frame.endFill();
    frame.position.set(-326, -240);

    return this.addChild(frame);
  }

  _createStatusText() {
    const text = new PIXI.Text(user, {});
    text.anchor.set(0.5);
    text.position.y = -195;

    return this.addChild(text);
  }
}
