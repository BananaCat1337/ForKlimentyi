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
      const validate = this.schema[key];
      return validate.isValid(value[key]);
    });
  }
}
