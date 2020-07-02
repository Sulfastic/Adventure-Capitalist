/* eslint-disable no-underscore-dangle */
import * as PIXI from 'pixi.js';
import eventEmitter from '../events/eventEmitter';
import WelcomeScreen from './scene/WelcomeScreen';

if (window.__PIXI_INSPECTOR_GLOBAL_HOOK__) {
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({PIXI});
}

class Root extends PIXI.Application {
  createWelcomeScreen(onComplete) {
    this.stage.addChild(new WelcomeScreen(onComplete));
  }
}

const app = new Root();

document.body.appendChild(app.view);
app.view.style.display = 'block';
app.view.style.margin = 'auto';

app.loader
  .add('bunny', '/assets/Pawełek.jpg')
  .add('red_button00', '/assets/red_button00.png')
  .add('red_button01', '/assets/red_button01.png')
  .add('red_button02', '/assets/red_button00.png')
  .add('chicken', '/assets/chick.png')
  .load((loader, resources) => eventEmitter.emit('load/complete', loader, resources));

export default app;
