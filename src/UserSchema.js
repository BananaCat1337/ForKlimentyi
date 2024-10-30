export default class UserSchema {
  shape(schema) {
    this.schema = schema;
    return this;
  }

  isValid(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return false;
    }
    return Object.keys(this.schema).every((key) => {
      const validator = this.schema[key];
      return validator.isValid(value[key]);
    });
  }
}
