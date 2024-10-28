import { IUserProfileGetRequest as IRestUserProfileGetRequest } from '../model/IUserProfileGetRequest';
import { IUserProfileGetRequest as IDomainUserProfileGetRequest } from '@/domain/user/command/IUserProfileGetRequest';
import { Component } from '@/lib/common/di/decorator';

@Component
export class UserProfileGetRequestConverter {
  toDomainModel(request: IRestUserProfileGetRequest): IDomainUserProfileGetRequest {
    return {
      id: request.id,
    };
  }
}
