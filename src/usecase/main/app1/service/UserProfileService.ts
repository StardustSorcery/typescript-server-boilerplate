import { IUserProfileGetRequest } from '@/domain/user/command/IUserProfileGetRequest';
import { IUserProfileUpdateRequest } from '@/domain/user/command/IUserProfileUpdateRequest';
import { IUserProfileRepository } from '@/domain/user/repository/IUserProfileRepository';
import { Component } from '@/lib/common/di/decorator';
import { ResourceNotFoundError } from '@/lib/common/error/ResourceNotFoundError';
import { inject } from 'tsyringe';

@Component
export class UserProfileService {
  constructor(
    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async get(request: IUserProfileGetRequest) {
    const userProfile = await this.userProfileRepository.findById(request.id);
    if (!userProfile) throw new ResourceNotFoundError();

    return userProfile;
  }

  async update(request: IUserProfileUpdateRequest) {
    const userProfile = await this.userProfileRepository.findById(request.id);
    if (!userProfile) throw new ResourceNotFoundError();

    // set values
    if (request.displayName) userProfile.setDisplayName(request.displayName);
    if (request.photo) userProfile.setPhotoURL('https://example.com/userphoto/hoge.jpg');
    if (request.description) userProfile.setDescription(request.description);

    await this.userProfileRepository.saveAndAssignId(userProfile);
  }
}
