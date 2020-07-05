/* eslint-disable no-underscore-dangle */
import ee from '../events/ee';
import WelcomeScreen from './scene/splash/WelcomeScreen';
import GameScreen from './scene/game/GameScreen';

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

const app = new Root({backgroundColor: 0xdeb887});

document.body.appendChild(app.view);
app.view.style.display = 'block';
app.view.style.margin = 'auto';

app.loader
  .add('button', '/assets/button.png')
  .add('chock_bar', '/assets/chock_bar.png')
  .add('coffe_chock', '/assets/coffe_chock.png')
  .add('ice_cream', '/assets/ice_cream.png')
  .add('super_market', '/assets/super_market.png')
  .add('empty', '/assets/empty.png')
  .add('market', '/assets/market.png')
  .add('manager1', '/assets/manager1.png')
  .add('manager2', '/assets/manager2.png')
  .add('manager3', '/assets/manager3.png')
  .add('manager4', '/assets/manager4.png')
  .add('music', '/sounds/music.mp3')
  .add('click1', '/sounds/click1.ogg')
  .load((loader, resources) => ee.emit('load/complete', loader, resources));

export default app;
