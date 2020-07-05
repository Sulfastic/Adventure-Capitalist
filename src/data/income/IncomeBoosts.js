import IncomeSource from './IncomeSource';
import incomeSources from './incomeSources.json';

export default new (class IncomeSources {
  constructor() {
    this.parse(incomeSources);
  }

  parse(sources) {
    this.sources = sources.map((incomeSource) => new IncomeSource(incomeSource));
  }
})();
