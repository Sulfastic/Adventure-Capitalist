import * as PIXI from 'pixi.js';

import viewStore from '../../data/viewStore';
import incomeBoosts from '../../data/income/IncomeBoosts';
import UserStatusFrame from './UserStatusFrame';
import BusinessView from './BusinessView';
import ManagerView from './ManagerView';
import availableManagers from '../../data/managers/ManagersAvailable';
import employedManagers from '../../data/managers/EmployedManagers';

export default class BusinessPanel extends PIXI.Container {
  constructor() {
    super();

    this._init();
  }

  _init() {
    this._transparentFrame = this._createTransparentFrame();
    this._userStatusFrame = this._createUserStatusFrame();
    this._businesses = this._createBusinesses();
    this._managers = this._createManagers();
  }

  _createUserStatusFrame() {
    const userFrame = new UserStatusFrame();
    userFrame.position.y = 0;

    return this.addChild(userFrame);
  }

  _createTransparentFrame() {
    const frame = new PIXI.Graphics();
    frame.beginFill(0x0574a3);
    frame.drawRoundedRect(
      0,
      0,
      viewStore.screenSize.width * 0.85,
      viewStore.screenSize.height * 0.85,
      20,
    );
    frame.endFill();
    frame.alpha = 0.75;
    frame.pivot.set(frame.width * 0.5, frame.height * 0.5);

    return this.addChild(frame);
  }

  _createBusinesses() {
    return incomeBoosts.sources
      .map((business, index) => {
        const businessView = new BusinessView(business);
        businessView.position.set(
          -285,
          this._transparentFrame.y - 86 + 99 * index,
        );

        return this.addChild(businessView);
      });
  }

  _createManagers() {
    return Object.values({
      ...employedManagers.managers,
      ...availableManagers.managers,
    }).map((manager, index) => {
      const businessView = new ManagerView(manager);
      businessView.position.set(
        45,
        this._transparentFrame.y - 86 + 99 * index,
      );

      return this.addChild(businessView);
    });
  }
}
