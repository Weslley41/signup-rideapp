import { UserAccount } from '@/features/signup/domain/entities';

export interface LoadUserAccountRepository {
  findByEmail(email: string): Promise<UserAccount | undefined>;
}

export interface SaveUserAccountRepository {
  save(providerData: UserAccount): Promise<void>;
}

export interface UserAccountRepository extends LoadUserAccountRepository, SaveUserAccountRepository {}
