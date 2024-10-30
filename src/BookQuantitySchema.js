export default class BookQuantitySchema {
  setBookQuantityRangeConstraint(min, max) {
    this.min = min;
    this.max = max;
    return this;
  }

  isValid(value) {
    if (value < 0 || !Number.isInteger(value)) {
      return false;
    }
    if (this.min !== undefined && this.max !== undefined) {
      return value >= this.min && value <= this.max;
    }
    return true;
  }
}
