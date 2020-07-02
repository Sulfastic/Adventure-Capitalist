// import * as PIXI from 'pixi.js';

// eslint-disable-next-line no-unused-vars
import controller from './logic/Controller';
import userData from './data/user/UserData';
import incomeBoosts from './data/income/IncomeBoosts';
import managersAvailable from './data/managers/ManagersAvailable';
import GameTimeData from './data/GameTimeData';
import Market from './logic/Market';

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

// eventEmitter.on('load/complete', (loader, resources) => {
//   debugger;
//   // This creates a texture from a 'bunny.png' image.
//   const bunny = new PIXI.Sprite(resources.bunny.texture);

//   // Setup the position of the bunny
//   bunny.x = app.renderer.width / 2;
//   bunny.y = app.renderer.height / 2;

//   // Rotate around the center
//   bunny.anchor.x = 0.5;
//   bunny.anchor.y = 0.5;

//   // Add the bunny to the scene we are building.
//   app.stage.addChild(bunny);

//   // Listen for frame updates
//   app.ticker.add(() => {
//     // each frame we spin the bunny around a bit
//     bunny.rotation += 0.01;
//     update();
//   });
// });
