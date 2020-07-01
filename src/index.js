import UserData from './data/UserData';
import incomeBoosts from './data/IncomeBoosts';
import GameTimeData from './data/GameTimeData';
import vendor from './logic/Vendor';

const SPEED = 500;
const gameTimeData = new GameTimeData();
const userData = new UserData();

function constructTimeSection() {
  document.querySelector('#game-time').innerText = gameTimeData;
}

function constructIncome() {
  document.querySelector('#user-income').innerText = userData;
}

function constructBoosts() {
  const list = document.querySelector('#powerup-options');
  for (let i = 0, len = incomeBoosts.length; i < len; i += 1) {
    const jobButton = document.createElement('button');
    jobButton.innerText = 'sell goods';
    jobButton.onclick = () => userData.workOnResource(incomeBoosts[i].name);
    const item = document.createElement('li');
    const paragraph = document.createElement('p');
    paragraph.innerText = incomeBoosts[i];
    paragraph.onclick = function onClick() {
      vendor.buyAnItem(userData, incomeBoosts[i]);

      paragraph.innerText = incomeBoosts[i];
      constructIncome();
    };
    list.appendChild(item);
    item.appendChild(paragraph);
    item.appendChild(jobButton);
  }
}

function addHourlyIncome() {
  // userData.cash += userData.hourlyIncome;
  constructIncome();
}

constructBoosts();

function update() {
  gameTimeData.tick();
  constructTimeSection();
  addHourlyIncome();
}

setInterval(update, SPEED);
