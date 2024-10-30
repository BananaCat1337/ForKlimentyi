import IsbnNumberSchema from './src/IsbnNumberSchema.js';
import BookQuantitySchema from './src/BookQuantitySchema.js';
import UserSchema from './src/UserSchema.js';

export default class Validator {
  isbnNumber() {
    return new IsbnNumberSchema();
  }

  bookQuantity() {
    return new BookQuantitySchema();
  }

  user() {
    return new UserSchema();
  }
}
