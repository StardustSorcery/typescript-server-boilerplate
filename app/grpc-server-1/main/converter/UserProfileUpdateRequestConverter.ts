import { IUserProfileUpdateRequest } from '@/domain/user/command/IUserProfileUpdateRequest';
import { UpdateUserProfileRequest } from '@stardustsorcery/proto-boilerplate/namespace1/app1/user/user_profile_pb';

export class UserProfileUpdateRequestConverter {
  toDomainModel(request: UpdateUserProfileRequest): IUserProfileUpdateRequest {
    return {
      id: request.getId(),
      displayName: request.getDisplayName(),
      photo: request.getPhoto(),
      description: request.getDescription(),
    };
  }
}
