import { UserProfileGetRequestConverter } from '../converter/UserProfileGetRequestConverter';
import { UserProfileUpdateRequestConverter } from '../converter/UserProfileUpdateRequestConverter';
import { UserProfileService } from '@/usecase/app1/service/UserProfileService';
import { UntypedHandleCall } from '@grpc/grpc-js';
import { IUserProfileServiceServer } from '@stardustsorcery/proto-boilerplate/namespace1/app1/user/user_profile_grpc_pb';
import {
  GetUserProfileResponse,
  UserProfile as GrpcUserProfile,
  UpdateUserProfileResponse,
} from '@stardustsorcery/proto-boilerplate/namespace1/app1/user/user_profile_pb';
import { container } from 'tsyringe';

export function createUserProfileGrpcService() {
  const userProfileService = container.resolve(UserProfileService);
  const userProfileGetRequestConverter = container.resolve(UserProfileGetRequestConverter);
  const userProfileUpdateRequestConverter = container.resolve(UserProfileUpdateRequestConverter);

  class UserProfileGrpcService implements IUserProfileServiceServer {
    [name: string]: UntypedHandleCall;
    constructor(
      public get: IUserProfileServiceServer['get'],
      public update: IUserProfileServiceServer['update']
    ) {}
  }

  const get: IUserProfileServiceServer['get'] = async (call, callback) => {
    const userProfile = await userProfileService.get(
      userProfileGetRequestConverter.toDomainModel(call.request)
    );
    if (!userProfile || !userProfile.id) throw new Error();

    const grpcUserProfile = new GrpcUserProfile();
    grpcUserProfile.setId(userProfile.id);
    grpcUserProfile.setDisplayName(userProfile.displayName);
    grpcUserProfile.setPhotoUrl(userProfile.photoURL);
    grpcUserProfile.setDescription(userProfile.description);

    const response = new GetUserProfileResponse();
    response.setUserProfile(grpcUserProfile);

    callback(null, response);
  };

  const update: IUserProfileServiceServer['update'] = async (call, callback) => {
    await userProfileService.update(userProfileUpdateRequestConverter.toDomainModel(call.request));

    const userProfile = await userProfileService.get({ id: call.request.getId() });
    if (!userProfile.id) throw new Error();

    const grpcUserProfile = new GrpcUserProfile();
    grpcUserProfile.setId(userProfile.id);
    grpcUserProfile.setDisplayName(userProfile.displayName);
    grpcUserProfile.setPhotoUrl(userProfile.photoURL);
    grpcUserProfile.setDescription(userProfile.description);

    const response = new UpdateUserProfileResponse();
    response.setUserProfile(grpcUserProfile);

    callback(null, response);
  };

  return new UserProfileGrpcService(get, update);
}
