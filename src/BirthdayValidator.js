export default class BirthdayValidator {
  setAdultValidator() {
    this.checkAdult = true;
    return this;
  }

  isValid(date) {
    if (!(date instanceof Date)) {
      return false;
    }
    const today = new Date();
    if (date > today) {
      return false;
    }
    if (this.checkAdult) {
      const age = today.getFullYear() - date.getFullYear();
      return age >= 18;
    }

    return true;
  }
}
