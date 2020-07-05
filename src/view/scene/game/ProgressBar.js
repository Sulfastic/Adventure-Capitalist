const dimensions = [0, 0, 150, 40, 15];

export default class ProgressBar extends PIXI.Container {
  set progress(value) {
    this._progress.mask.position.x = -150 + 151 * value;
  }

  constructor() {
    super();

    this._init();
  }

  _init() {
    this._background = this._createBackground();
    this._progress = this._createProgress();
  }

  _createBackground() {
    const background = new PIXI.Graphics();
    background.beginFill(0xb9ac92);
    background.drawRoundedRect(...dimensions);
    background.endFill();

    return this.addChild(background);
  }

  _createProgress() {
    const progress = new PIXI.Graphics();
    progress.beginFill(0xc4fb6d);
    progress.drawRoundedRect(...dimensions);
    progress.endFill();
    progress.mask = this._createMask();

    return this.addChild(progress);
  }

  _createMask() {
    const mask = new PIXI.Graphics();
    mask.beginFill();
    mask.drawRoundedRect(...dimensions);
    mask.endFill();
    mask.position.x = -150;

    return this.addChild(mask);
  }
}
