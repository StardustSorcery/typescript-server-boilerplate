import { IUserProfileGetRequest } from '@/domain/user/command/IUserProfileGetRequest';
import { Component } from '@/lib/common/di/decorator';
import { GetUserProfileRequest } from '@stardustsorcery/proto-boilerplate/namespace1/app1/user/user_profile_pb';

@Component
export class UserProfileGetRequestConverter {
  toDomainModel(request: GetUserProfileRequest): IUserProfileGetRequest {
    return {
      id: request.getId(),
    };
  }
}
