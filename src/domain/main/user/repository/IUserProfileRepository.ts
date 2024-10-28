import { UserProfile } from '../model/UserProfile';
import { IRepositoryBase } from '@/domain/base/repository/IRepositoryBase';

export interface IUserProfileRepository extends IRepositoryBase<string, UserProfile> {
  delete: (id: string) => Promise<void>;
}
