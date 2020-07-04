// eslint-disable-next-line no-unused-vars
import controller from './logic/Controller';
import incomeBoosts from './data/income/IncomeBoosts';
import availableManagers from './data/managers/ManagersAvailable';
import Market from './logic/Market';
import user from './data/user/UserData';
import employedManagers from './data/managers/EmployedManagers';

const userName = 'Paweł';

function saveGameStatus() {
  debugger;
  const {cash, inventory} = user;
  localStorage.setItem(userName, JSON.stringify({
    incomeSources: incomeBoosts.sources,
    user: {cash, inventory, saveTimestamp: Date.now()},
    availableManagers: availableManagers.managers,
    employedManagers: employedManagers.managers,
  }));
}

window.saveGameStatus = saveGameStatus;

function parseEverythingIfPossible() {
  debugger;
  const savedData = localStorage[userName];
  if (savedData) {
    const datainJson = JSON.parse(savedData);
    datainJson.user.loadTimestamp = Date.now();
    user.parse(datainJson.user);
    incomeBoosts.parse(datainJson.incomeSources);
    availableManagers.parse(datainJson.availableManagers);
    employedManagers.parse(datainJson.employedManagers);
  }
}

function orderManagersToWorkIfPossible() {
  Object.values(employedManagers.managers).forEach((manager) => {
    Market.orderManagerToWork(manager.incomeSourceUsage);
  });
}

window.addEventListener('load', () => {
  parseEverythingIfPossible();
  Market.produceOfflineIncome();
  orderManagersToWorkIfPossible();
});

window.addEventListener('beforeunload', saveGameStatus);
