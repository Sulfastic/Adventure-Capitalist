import Button from '../../components/Button';
import BaseFrameView from './BaseFrameView';
import ee from '../../../events/ee';
import user from '../../../data/user/UserData';
import ProgressBar from './ProgressBar';

export default class BusinessView extends BaseFrameView {
  updateTransform() {
    super.updateTransform();

    this._name.text = this._getTextToDisplay();
    this._setButtonsAvailability();
  }

  _init(business) {
    super._init(business);

    this._businessProduceButton = this._createProduceButton(business);
    this._businessBuyButton = this._createBuyButton(business);
    this._businessProgressBar = this._createBusinessProgressBar();

    ee.once(`${business.name}/bought`, () => this._unlockProductionButtonIfPossible());
    ee.on(`production/progress${business.name}`, (value) => {
      this._businessProgressBar.progress = value;
    });
    ee.on(`production/finished${business.name}`, () => {
      this._businessProgressBar.progress = 0;
    });
  }

  _createFrame() {
    return super._createFrame(0xffa931);
  }

  _createProduceButton(business) {
    const button = new Button(business.icon, () => {
      button.disable();
      ee.emit('produce', business, () => button.enable());
    }, '');
    if (!user.inventory[this._template.name]) {
      button.disable();
    }
    button.anchor.set(0.5);
    button.scale.set(0.35);

    return this.addChild(button);
  }

  _createBuyButton(business) {
    const button = new Button('button', () => ee.emit('buyBusiness', business), 'Buy');
    button.anchor.set(0.5);
    button.setBaseScale(0.3);
    button.position.x = this._businessProduceButton.width + button.width * 0.5;

    return this.addChild(button);
  }

  _createBusinessProgressBar() {
    const progressBar = new ProgressBar();
    progressBar.position.set(119, -21);

    return this.addChild(progressBar);
  }

  _unlockProductionButtonIfPossible() {
    this._businessProduceButton.enable();
  }

  _setButtonsAvailability() {
    if (user.cash < this._template.finalCost) {
      this._businessBuyButton.disable();
    } else {
      this._businessBuyButton.enable();
    }
  }

  _getTextToDisplay() {
    const business = user.inventory[this._template.name];
    if (business) {
      return `$${this._template.finalCost.toFixed(2)}, income: $${business.totalIncome}`;
    }

    return this._template;
  }
}
