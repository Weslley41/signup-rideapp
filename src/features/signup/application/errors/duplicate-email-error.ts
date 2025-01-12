export class DuplicateEmailError extends Error {
  constructor() {
    super('This Email Is Already In Use');
  }
}
