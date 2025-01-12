import { UserAccount } from '@/features/signup/domain/entities';

import { UserAccountRepository } from '../contracts';
import { DuplicateEmailError } from '../errors/duplicate-email-error';

export class UserAccountService {
  constructor(private readonly userAccountRepository: UserAccountRepository) {}

  async create(userAccount: UserAccount): Promise<void> {
    const hasAccountWithEmail = await this.userAccountRepository.findByEmail(userAccount.email);
    if (hasAccountWithEmail) {
      throw new DuplicateEmailError();
    }

    await this.userAccountRepository.save(userAccount);
  }
}
