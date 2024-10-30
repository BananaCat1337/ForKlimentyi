import IpAddressSchema from './src/IpAddressSchema.js';
import BirthdayValidator from './src/BirthdayValidator.js';
import UserSchema from './src/UserSchema.js';

export default class Validator {
  ipAddress() {
    return new IpAddressSchema();
  }

  birthday() {
    return new BirthdayValidator();
  }

  user() {
    return new UserSchema();
  }
}
