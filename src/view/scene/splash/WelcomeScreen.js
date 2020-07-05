import viewStore from '../../../data/view/viewStore';
import Button from '../../components/Button';

export default class WelcomeScreen extends PIXI.Container {
  constructor(onComplete) {
    super();

    this._init(onComplete);
  }

  _init(onComplete) {
    this._onCompleteCallback = onComplete;
    this._welcomeText = this._createWelcomeText();
    this._continueButton = this._createContinueButton();
  }

  _createWelcomeText() {
    const text = new PIXI.Text(this._getWelcomeText(), this._getWelcomeStyle());
    text.anchor.set(0.5);
    text.position.set(viewStore.screenSize.width * 0.5, viewStore.screenSize.height * 0.5);

    return this.addChild(text);
  }

  _createContinueButton() {
    const button = new Button('button', this._onCompleteCallback, 'Continue');
    button.anchor.set(0.5);
    button.position.set(viewStore.screenSize.width * 0.5, viewStore.screenSize.height * 0.65);
    button.setBaseScale(0.62);

    return this.addChild(button);
  }

  // eslint-disable-next-line class-methods-use-this
  _getWelcomeText() {
    return 'Welcome to the Adventure Capitalist game,\n press the button below to continue';
  }

  // eslint-disable-next-line class-methods-use-this
  _getWelcomeStyle() {
    return {
      align: 'center',
    };
  }
}
