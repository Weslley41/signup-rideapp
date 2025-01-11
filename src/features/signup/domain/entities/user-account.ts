import { AccountType, UserAccountInput } from '../contracts';

export class UserAccount {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly cpf: string;
  readonly password: string;
  readonly type: AccountType;
  readonly carPlate?: string;

  constructor(data: UserAccountInput) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.cpf = data.cpf;
    this.password = data.password;
    this.type = data.type;
    this.carPlate = data.carPlate;
  }
}
