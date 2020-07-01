import userData from './data/UserData';
import incomeBoosts from './data/IncomeBoosts';
import managersAvailable from './data/ManagersAvailable';
import GameTimeData from './data/GameTimeData';
import Market from './logic/Market';

const SPEED = 30 / 1000; // 30 fps
const gameTimeData = new GameTimeData();

function constructTimeSection() {
  document.querySelector('#game-time').innerText = gameTimeData;
}

function constructIncome() {
  document.querySelector('#user-income').innerText = userData;
}

function constructBoosts() {
  const list = document.querySelector('#powerup-options');
  for (let i = 0, len = incomeBoosts.length; i < len; i += 1) {
    const incomeBoost = incomeBoosts[i];
    const jobButton = document.createElement('button');
    jobButton.innerText = 'sell goods';
    jobButton.onclick = () => {
      jobButton.disabled = true;
      Market.workOnResource(incomeBoost, () => {
        jobButton.disabled = false;
      });
    };
    const item = document.createElement('li');
    const paragraph = document.createElement('p');
    paragraph.innerText = incomeBoost;
    paragraph.onclick = function onClick() {
      Market.buyAnItem(incomeBoost);

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
  for (let i = 0, len = managersAvailable.length; i < len; i += 1) {
    const manager = managersAvailable[i];
    const item = document.createElement('li');
    const paragraph = document.createElement('p');
    const hireButton = document.createElement('button');
    hireButton.innerText = 'hire';
    hireButton.onclick = () => Market.hireManager(manager);
    paragraph.innerText = manager;

    list.appendChild(item);
    item.appendChild(paragraph);
    item.appendChild(hireButton);
  }
}

function addHourlyIncome() {
  // userData.cash += userData.hourlyIncome;
  constructIncome();
}

constructBoosts();
constructManagers();

function update() {
  // gameTimeData.tick();
  constructTimeSection();
  addHourlyIncome();
}

setInterval(update, SPEED);
