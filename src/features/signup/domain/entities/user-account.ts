import { AccountType, UserAccountInput } from '../contracts';
import { InvalidCarPlateError } from '../errors/invalid-car-plate-error';
import { EmailValidationError } from '../errors/invalid-email-error';

export class UserAccount {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly cpf: string;
  readonly password: string;
  readonly type: AccountType;
  readonly carPlate?: string;

  constructor(data: UserAccountInput) {
    if (!this.isValidEmail(data.email)) {
      throw new EmailValidationError();
    }

    if (data.type === AccountType.DRIVER && !this.isValidCarPlate(data.carPlate)) {
      throw new InvalidCarPlateError();
    }

    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.cpf = data.cpf;
    this.password = data.password;
    this.type = data.type;
    this.carPlate = data.carPlate;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidCarPlate(carPlate?: string): boolean {
    if (!carPlate) return false;
    const carPlateRegex = /^[A-Z]{3}-\d{4}$/;
    return carPlateRegex.test(carPlate);
  }
}
