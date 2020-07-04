/* eslint-disable no-underscore-dangle */
import * as PIXI from 'pixi.js';
import eventEmitter from '../events/eventEmitter';
import WelcomeScreen from './scene/WelcomeScreen';
import GameScreen from './scene/GameScreen';

if (window.__PIXI_INSPECTOR_GLOBAL_HOOK__) {
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({PIXI});
}

class Root extends PIXI.Application {
  createWelcomeScreen(onComplete) {
    this.stage.addChild(new WelcomeScreen(onComplete));
  }

  removeWelcomeScreen() {
    this.stage.removeChildren();
  }

  createGameScreen() {
    this.stage.addChild(new GameScreen());
  }
}

const app = new Root();

document.body.appendChild(app.view);
app.view.style.display = 'block';
app.view.style.margin = 'auto';

app.loader
  .add('red_button', '/assets/red_button.png')
  .add('chicken', '/assets/chick.png')
  .add('market', '/assets/market.jpg')
  .load((loader, resources) => eventEmitter.emit('load/complete', loader, resources));

export default app;
