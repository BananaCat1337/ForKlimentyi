export default class IpAddressSchema {
  setIpAddressLengthConstraint(min, max = Infinity) {
    this.min = min;
    this.max = max;
    return this;
  }

  isValid(value) {
    if (typeof value !== 'string' || !value.startsWith('27')) {
      return false;
    }
    if (this.min !== undefined) {
      const validateIp = value.slice(3);
      return validateIp.length >= this.min && validateIp.length <= this.max;
    }
    return true;
  }
}
