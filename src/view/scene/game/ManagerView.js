import Button from '../../components/Button';
import BaseFrameView from './BaseFrameView';
import ee from '../../../events/ee';
import viewStore from '../../../data/viewStore';
import availableManagers from '../../../data/managers/ManagersAvailable';
import user from '../../../data/user/UserData';

export default class ManagerView extends BaseFrameView {
  updateTransform() {
    super.updateTransform();

    this._name.text = this._template;
    this._setButtonAvailability();
  }

  _createFrame() {
    return super._createFrame(0xfecb89);
  }

  _init(manager) {
    super._init(manager);

    this._hireButton = this._createHireButton(manager);
    this._managerImage = this._createManagerImage(manager);
  }

  _createHireButton(manager) {
    const button = new Button('button', () => ee.emit('hire/manager', manager), 'Hire');
    button.anchor.set(0.5);
    button.setBaseScale(0.3);

    if (!availableManagers.managers[manager.name]) {
      button.disable();
    }

    return this.addChild(button);
  }

  _createManagerImage({icon}) {
    const image = new PIXI.Sprite(viewStore.texturesCache[icon].texture);
    image.anchor.set(0.5);
    image.position.set(225, -20);

    return this.addChild(image);
  }

  _setButtonAvailability() {
    if (this._userCanAfford() && this._isAvailableManager() && this._hasBusiness()) {
      this._hireButton.enable();
    } else {
      this._hireButton.disable();
    }
  }

  _userCanAfford() {
    return user.cash > this._template.baseCost;
  }

  _isAvailableManager() {
    return availableManagers._managers[this._template.name];
  }

  _hasBusiness() {
    return user.inventory[this._template.incomeSourceUsage];
  }
}
