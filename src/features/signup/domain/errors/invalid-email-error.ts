export class EmailValidationError extends Error {
  constructor() {
    super('Invalid Email Format');
  }
}
