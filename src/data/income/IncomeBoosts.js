import IncomeSource from './IncomeSource';
import incomeSources from './incomeSources.json';

export default incomeSources.map((incomeSource) => new IncomeSource(incomeSource));
