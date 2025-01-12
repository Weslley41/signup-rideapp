import { UserAccount } from '@/features/signup/domain/entities';

import { UserAccountRepository } from '../contracts';

export class UserAccountService {
  constructor(private readonly userAccountRepository: UserAccountRepository) {}

  async create(userAccount: UserAccount): Promise<void> {
    const hasAccountWithEmail = await this.userAccountRepository.findByEmail(userAccount.email);
    if (hasAccountWithEmail) {
      throw new Error('This email is already in use');
    }

    await this.userAccountRepository.save(userAccount);
  }
}
