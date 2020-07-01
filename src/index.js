import incomeBoosts from './data/income/IncomeBoosts';
import availableManagers from './data/managers/ManagersAvailable';
import Market from './logic/Market';
import user from './data/user/UserData';
import employedManagers from './data/managers/EmployedManagers';

const SPEED = 30 / 1000; // 30 fps

function constructIncome() {
  document.querySelector('#user-income').innerText = user;
}

function constructBusinesses() {
  const ul = document.querySelector('#owned-businesses');
  ul.innerHTML = '';
  Object.keys(user.inventory).forEach((name) => {
    const li = document.createElement('li');
    const business = user.getBusinessByName(name);
    li.innerText = (`${name} business has an income of: $ ${business.totalIncome}`);
    ul.appendChild(li);
  });
}

function constructBoosts() {
  const list = document.querySelector('#powerup-options');
  const {sources} = incomeBoosts;
  for (let i = 0, len = sources.length; i < len; i += 1) {
    const incomeBoost = sources[i];
    const jobButton = document.createElement('button');
    jobButton.innerText = 'sell goods';
    jobButton.onclick = () => {
      jobButton.disabled = true;
      Market.workOnResource(incomeBoost.name, () => {
        jobButton.disabled = false;
      });
    };
    const item = document.createElement('li');
    const paragraph = document.createElement('p');
    paragraph.innerText = incomeBoost;
    paragraph.onclick = function onClick() {
      Market.buyABusiness(incomeBoost);

      paragraph.innerText = incomeBoost;
      constructIncome();
    };
    list.appendChild(item);
    item.appendChild(paragraph);
    item.appendChild(jobButton);
  }
}

function constructManagers() {
  const list = document.querySelector('#managers-options');
  Object.values(availableManagers.managers).forEach((manager) => {
    const item = document.createElement('li');
    const paragraph = document.createElement('p');
    const hireButton = document.createElement('button');
    hireButton.innerText = 'hire';
    hireButton.onclick = () => {
      debugger;
      Market.hireManager(manager);
      Market.orderManagerToWork(manager.incomeSourceUsage);
    };
    paragraph.innerText = manager;

    list.appendChild(item);
    item.appendChild(paragraph);
    item.appendChild(hireButton);
  });
}

function update() {
  constructIncome();
  constructBusinesses();
}

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
  constructBoosts();
  constructManagers();
  setInterval(update, SPEED);
});

window.addEventListener('beforeunload', saveGameStatus);
