export default class IsbnNumberSchema {
  setLengthConstraint(min, max = Infinity) {
    this.min = min;
    this.max = max;
    return this;
  }

  isValid(value) {
    if (typeof value !== 'string' || !value.startsWith('ISBN_')) {
      return false;
    }
    if (this.min !== undefined) {
      const { length } = value.slice(5);
      return length >= this.min && length <= this.max;
    }
    return true;
  }
}
