export enum AccountType {
  DRIVER,
  PASSENGER,
}

export type UserAccountInput = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  type: AccountType;
  carPlate?: string;
};
