import { AccountType, UserAccountInput } from '@/features/signup/domain/contracts';
import { UserAccount } from '@/features/signup/domain/entities';

describe(UserAccount.name, () => {
  it('should create a valid user account', () => {
    const data: UserAccountInput = {
      id: '1',
      name: 'any_name',
      email: 'any_email',
      cpf: 'any_cpf',
      password: 'any_password',
      type: AccountType.PASSENGER,
    };

    const user = new UserAccount(data);

    expect(user.id).toBe(data.id);
    expect(user.name).toBe(data.name);
    expect(user.email).toBe(data.email);
    expect(user.cpf).toBe(data.cpf);
    expect(user.password).toBe(data.password);
    expect(user.type).toBe(data.type);
  });
});
