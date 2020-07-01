export default class GameTimeData {
  constructor() {
    this.hour = 1;
    this.day = 1;
    this.month = 1;
    this.year = 1;
  }

  tick() {
    this.incrementHour();
  }

  incrementHour() {
    if (this.hour !== 24) {
      this.hour += 1;
    } else {
      this.hour = 1;
      this.incrementDay();
    }
  }

  incrementDay() {
    if (!this.isEndOfMonth()) {
      this.day += 1;
    } else {
      this.day = 1;
      this.incrementMonth();
    }
  }

  incrementMonth() {
    if (this.month !== 12) {
      this.month += 1;
    } else {
      this.month = 1;
      this.year += 1;
    }
  }

  isEndOfMonth() {
    let endOfMonth = false;
    switch (true) {
      case (this.month === 1 && this.day === 31):
        endOfMonth = true;
        break;

      case (this.month === 2 && this.day === 28):
        endOfMonth = true;
        break;

      case (this.month === 3 && this.day === 31):
        endOfMonth = true;
        break;

      case (this.month === 4 && this.day === 30):
        endOfMonth = true;
        break;

      case (this.month === 5 && this.day === 31):
        endOfMonth = true;
        break;

      case (this.month === 6 && this.day === 30):
        endOfMonth = true;
        break;

      case (this.month === 7 && this.day === 31):
        endOfMonth = true;
        break;

      case (this.month === 8 && this.day === 31):
        endOfMonth = true;
        break;

      case (this.month === 9 && this.day === 30):
        endOfMonth = true;
        break;

      case (this.month === 10 && this.day === 31):
        endOfMonth = true;
        break;

      case (this.month === 11 && this.day === 30):
        endOfMonth = true;
        break;

      case (this.month === 12 && this.day === 31):
        endOfMonth = true;
        break;

      default:
        endOfMonth = false;
    }

    return endOfMonth;
  }

  toString() {
    return (`Hour: ${this.hour} Day: ${this.day} Month: ${this.month} Year: ${this.year}`);
  }
}
