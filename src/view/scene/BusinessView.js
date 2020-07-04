import Button from '../Button';
import BaseFrameView from './BaseFrameView';
import ee from '../../events/eventEmitter';

export default class BusinessView extends BaseFrameView {
  _init(business) {
    super._init(business);

    this._businessProduceButton = this._createProduceButton(business);
    this._businessBuyButton = this._createBuyButton(business);
  }

  _createProduceButton(business) {
    const button = new Button('chicken', () => {
      button.disable();
      ee.emit('produce', business, () => button.enable());
    }, '');
    button.anchor.set(0.5);
    button.scale.set(0.35);

    return this.addChild(button);
  }

  _createBuyButton(business) {
    const button = new Button('red_button', () => ee.emit('buyBusiness', business), 'Buy');
    button.anchor.set(0.5);
    button.position.x = this._businessProduceButton.width + button.width * 0.5;

    return this.addChild(button);
  }
}
