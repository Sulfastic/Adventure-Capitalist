import ee from '../events/eventEmitter';
import viewStore from '../data/viewStore';
import app from '../view/app';

class Controller {
  constructor() {
    ee.once('load/complete', () => {
      this._updateStore();
      this.createWelcomeScreen();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createWelcomeScreen() {
    app.createWelcomeScreen(() => ee.emit('game/show'));
  }

  // eslint-disable-next-line class-methods-use-this
  _updateStore() {
    viewStore.setProperty('screenSize', {
      width: app.screen.width,
      height: app.screen.height,
    });

    viewStore.setProperty('texturesCache', app.loader.resources);
  }
}

const controller = new Controller();

export default controller;
