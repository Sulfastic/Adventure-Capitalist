import ee from '../events/ee';
import viewStore from '../data/viewStore';
import app from '../view/app';
import Market from './Market';
import user from '../data/user/UserData';
import incomeBoosts from '../data/income/IncomeBoosts';
import availableManagers from '../data/managers/ManagersAvailable';
import employedManagers from '../data/managers/EmployedManagers';

function _parseData() {
  const savedData = localStorage.savedUser;
  if (savedData) {
    const datainJson = JSON.parse(savedData);
    datainJson.user.loadTimestamp = Date.now();
    user.parse(datainJson.user);
    incomeBoosts.parse(datainJson.incomeSources);
    availableManagers.parse(datainJson.availableManagers);
    employedManagers.parse(datainJson.employedManagers);
  }
}

function _refreshMarket() {
  Market.produceOfflineIncome();
  Market.forceOrderManagersToWork();
}

function _onWindowLoad() {
  _parseData();
}

function _saveGameStatus() {
  const {cash, inventory} = user;
  localStorage.setItem('savedUser', JSON.stringify({
    incomeSources: incomeBoosts.sources,
    user: {cash, inventory, saveTimestamp: Date.now()},
    availableManagers: availableManagers.managers,
    employedManagers: employedManagers.managers,
  }));
}

function _onWindowClose() {
  _saveGameStatus();
}

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
  _refreshMarket();
  app.removeWelcomeScreen();
  app.createGameScreen();
}

function _onBuyBusiness(business) {
  Market.buyABusiness(business);
}

function _onProduce({name}, onComplete) {
  Market.workOnResource(name, onComplete);
}

function _onHireManager(manager) {
  Market.hireManager(manager);
  Market.orderManagerToWork(manager.incomeSourceUsage);
}

export default (() => {
  window.addEventListener('load', _onWindowLoad);
  window.addEventListener('beforeunload', _onWindowClose);
  ee.once('load/complete', _onLoadComplete);
  ee.once('game/show', _onGameShow);
  ee.on('buyBusiness', _onBuyBusiness);
  ee.on('produce', _onProduce);
  ee.on('hire/manager', _onHireManager);
})();
