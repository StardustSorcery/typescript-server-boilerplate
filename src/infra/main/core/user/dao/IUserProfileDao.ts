import { IDaoBase } from '../../base/dao/IDaoBase';
import { UserProfile } from '@/domain/user/model/UserProfile';

export interface IUserProfileDao extends IDaoBase<string, UserProfile> {
  delete: (id: string) => Promise<void>;
}
