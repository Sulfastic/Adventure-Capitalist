import ee from '../events/eventEmitter';
import viewStore from '../data/viewStore';
import app from '../view/app';
import Market from './Market';

function _updateStore() {
  viewStore.setProperty('screenSize', {
    width: app.screen.width,
    height: app.screen.height,
  });

  viewStore.setProperty('texturesCache', app.loader.resources);
}

function _createWelcomeScreen() {
  app.createWelcomeScreen(() => ee.emit('game/show'));
}

function _onLoadComplete() {
  _updateStore();
  _createWelcomeScreen();
}

function _onGameShow() {
  app.removeWelcomeScreen();
  app.createGameScreen();
}
class Controller {
  constructor() {
    ee.once('load/complete', _onLoadComplete);
    ee.once('game/show', _onGameShow);
    ee.on('buyBusiness', (business) => Market.buyABusiness(business));
    ee.on('produce', ({name}, onComplete) => Market.workOnResource(name, onComplete));
    ee.on('hire/manager', (manager) => {
      Market.hireManager(manager);
      Market.orderManagerToWork(manager.incomeSourceUsage);
    });
  }
}

const controller = new Controller();

export default controller;
