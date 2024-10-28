import { RepositoryBase } from '../../base/repository/RepositoryBase';
import { IUserProfileDao } from '../dao/IUserProfileDao';
import { UserProfile } from '@/domain/user/model/UserProfile';
import { IUserProfileRepository } from '@/domain/user/repository/IUserProfileRepository';
import { Component } from '@/lib/common/di/decorator';
import { inject } from 'tsyringe';

@Component
export class UserProfileRepository
  extends RepositoryBase<string, UserProfile, IUserProfileDao>
  implements IUserProfileRepository
{
  constructor(@inject('UserProfileDao') adapter: IUserProfileDao) {
    super(adapter);
  }

  async delete(id: string): Promise<void> {
    return await this.adapter.delete(id);
  }
}
