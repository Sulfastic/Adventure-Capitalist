import Button from '../Button';
import BaseFrameView from './BaseFrameView';
import ee from '../../events/eventEmitter';

export default class ManagerView extends BaseFrameView {
  _init(manager) {
    super._init(manager);

    this._hireButton = this._createHireButton(manager);
  }

  _createHireButton(manager) {
    const button = new Button('red_button', () => ee.emit('hire/manager', manager), 'Hire');
    button.anchor.set(0.5);
    button.position.x = 90;

    return this.addChild(button);
  }
}
