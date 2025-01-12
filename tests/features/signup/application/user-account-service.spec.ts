import { UserAccountRepository } from "@/features/signup/application/contracts";
import { DuplicateEmailError } from "@/features/signup/application/errors/duplicate-email-error";
import { UserAccountService } from "@/features/signup/application/services";
import { AccountType, UserAccountInput } from "@/features/signup/domain/contracts";
import { UserAccount } from "@/features/signup/domain/entities";
import { MockProxy, mock } from "jest-mock-extended";

describe(UserAccountService.name, () => {
  const defaultPassengerData: UserAccountInput = {
    id: "1",
    name: "any_name",
    email: "any_email@mail.com",
    cpf: "12345678900",
    password: "any_password",
    type: AccountType.PASSENGER,
  };
  const defaultDriverData: UserAccountInput = {
    id: "2",
    name: "any_name",
    email: "any_email@mail.com",
    cpf: "12345678900",
    password: "any_password",
    type: AccountType.DRIVER,
    carPlate: "ABC-1234",
  };
  let userAccountRepository: MockProxy<UserAccountRepository>;
  let sut: UserAccountService;

  beforeAll(() => {
    userAccountRepository = mock();
  });

  beforeEach(() => {
    sut = new UserAccountService(userAccountRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save a passenger account", async () => {
    userAccountRepository.findByEmail.mockResolvedValueOnce(undefined);
    const userToSave = new UserAccount(defaultPassengerData);
    await sut.create(userToSave);

    expect(userAccountRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userAccountRepository.save).toHaveBeenCalledTimes(1);
  });

  it("should save a driver account", async () => {
    userAccountRepository.findByEmail.mockResolvedValueOnce(undefined);
    const userToSave = new UserAccount(defaultDriverData);
    await sut.create(userToSave);

    expect(userAccountRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userAccountRepository.save).toHaveBeenCalledTimes(1);
  });

  it("should throws a error when email is already in use", () => {
    userAccountRepository.findByEmail.mockResolvedValueOnce(
      new UserAccount(defaultPassengerData)
    );

    const userToSave = new UserAccount(defaultPassengerData);
    const promise = sut.create(userToSave);

    expect(promise).rejects.toThrow(DuplicateEmailError);
  });
});
