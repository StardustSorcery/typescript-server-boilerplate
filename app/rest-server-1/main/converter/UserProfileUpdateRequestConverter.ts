import { IUserProfileUpdateRequest as IRestUserProfileUpdateRequest } from '../model/IUserProfileUpdateRequest';
import { IUserProfileUpdateRequest as IDomainUserProfileUpdateRequest } from '@/domain/user/command/IUserProfileUpdateRequest';
import { Component } from '@/lib/common/di/decorator';

@Component
export class UserProfileUpdateRequestConverter {
  toDomainModel(request: IRestUserProfileUpdateRequest): IDomainUserProfileUpdateRequest {
    return {
      id: request.id,
      displayName: request.displayName,
      photo: request.photo,
      description: request.description,
    };
  }
}
