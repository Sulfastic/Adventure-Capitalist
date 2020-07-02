import * as PIXI from 'pixi.js';

export default class GameScreen extends PIXI.Container {
  constructor() {
    super();

    this._init();
  }

  _init() {
    this._businesses = this._createBusinesses();
    this._managers = this._createManagers();
  }

  _createBusinesses() {
    
  }
}
