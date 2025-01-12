export class InvalidCarPlateError extends Error {
  constructor() {
    super('Invalid Car Plate Format');
  }
}
