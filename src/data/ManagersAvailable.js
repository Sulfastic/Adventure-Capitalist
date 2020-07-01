import Manager from './Manager';
import managers from './managers.json';

export default managers.map((manager) => new Manager(manager));
