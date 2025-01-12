import { AccountType, UserAccountInput } from '@/features/signup/domain/contracts';
import { UserAccount } from '@/features/signup/domain/entities';
import { InvalidCarPlateError } from '@/features/signup/domain/errors/invalid-car-plate-error';
import { EmailValidationError } from '@/features/signup/domain/errors/invalid-email-error';

describe(UserAccount.name, () => {
  it('should create a valid passenger user account', () => {
    const data: UserAccountInput = {
      id: '1',
      name: 'test_name',
      email: 'test@email.com',
      cpf: '12346578900',
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
    expect(user.carPlate).toBeUndefined();
  });

  it('should create a valid driver user account', () => {
    const data: UserAccountInput = {
      id: '1',
      name: 'test_name',
      email: 'test@email.com',
      cpf: '12346578900',
      password: 'any_password',
      type: AccountType.DRIVER,
      carPlate: 'ABC-1234',
    };
    
    const user = new UserAccount(data);

    expect(user.id).toBe(data.id);
    expect(user.name).toBe(data.name);
    expect(user.email).toBe(data.email);
    expect(user.cpf).toBe(data.cpf);
    expect(user.password).toBe(data.password);
    expect(user.type).toBe(data.type);
    expect(user.carPlate).toBe('ABC-1234');
  });

  it('Should throw an error if email format is invalid', () => {
      const data: UserAccountInput = {
        id: '1',
        name: 'test_name',
        email: 'invalid_email',
        cpf: '12346578900',
        password: 'any_password',
        type: AccountType.PASSENGER,
    };

      expect(() => new UserAccount(data)).toThrow(EmailValidationError);

    });
  
  it('Should throw an error if car plate format is invalid for a driver', () => {

    const data: UserAccountInput = {
      id: '1',
      name: 'test_name',
      email: 'test@email.com',
      cpf: '12346578900',
      password: 'any_password',
      type: AccountType.DRIVER,
      carPlate: 'ABC1234',
    };

      expect(() => new UserAccount(data)).toThrow(InvalidCarPlateError);
    });
});
