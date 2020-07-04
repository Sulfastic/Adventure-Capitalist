import IncomeSource from './IncomeSource';
import incomeSources from './incomeSources.json';

export default new (class IncomeSources {
  get sources() {
    return this._sources;
  }

  constructor() {
    this._sources = incomeSources.map((incomeSource) => new IncomeSource(incomeSource));
  }

  parse(sources) {
    this._sources = sources.map((incomeSource) => new IncomeSource(incomeSource));
  }
})();
