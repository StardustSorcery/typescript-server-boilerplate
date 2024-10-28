import { UserProfileGetRequestConverter } from '../converter/UserProfileGetRequestConverter';
import { UserProfileUpdateRequestConverter } from '../converter/UserProfileUpdateRequestConverter';
import { IUserProfileGetResponse } from '../model/IUserProfileGetResponse';
import { IUserProfileUpdateResponse } from '../model/IUserProfileUpdateResponse';
import { UserProfileGetRequestValidator } from '../validator/UserProfileGetRequestValidator';
import { UserProfileUpdateRequestValidator } from '../validator/UserProfileUpdateRequestValidator';
import { Component } from '@/lib/common/di/decorator';
import { ResourceNotFoundError } from '@/lib/common/error/ResourceNotFoundError';
import { UserProfileService } from '@/usecase/app1/service/UserProfileService';
import express, { Router } from 'express';
import { container, inject } from 'tsyringe';

@Component
export class UserProfileController {
  constructor(
    @inject('UserProfileGetRequestValidator')
    private userProfileGetRequestValidator: UserProfileGetRequestValidator,
    @inject('UserProfileGetRequestConverter')
    private userProfileGetRequestConverter: UserProfileGetRequestConverter,
    @inject('UserProfileUpdateRequestValidator')
    private userProfileUpdateRequestValidator: UserProfileUpdateRequestValidator,
    @inject('UserProfileUpdateRequestConverter')
    private userProfileUpdateRequestConverter: UserProfileUpdateRequestConverter,
    @inject('UserProfileService')
    private userProfileService: UserProfileService
  ) {}

  async get(req: express.Request): Promise<IUserProfileGetResponse> {
    const request = this.userProfileGetRequestValidator.validate(req.params);
    const command = this.userProfileGetRequestConverter.toDomainModel(request);

    const userProfile = await this.userProfileService.get(command);
    if (!userProfile.id) throw new ResourceNotFoundError();

    return {
      id: userProfile.id,
      displayName: userProfile.displayName,
      photoURL: userProfile.photoURL,
      description: userProfile.description,
    };
  }

  async update(req: express.Request): Promise<IUserProfileUpdateResponse> {
    const request = this.userProfileUpdateRequestValidator.validate({ ...req.body, ...req.params });
    const command = this.userProfileUpdateRequestConverter.toDomainModel(request);

    await this.userProfileService.update(command);

    const userProfile = await this.userProfileService.get(command);
    if (!userProfile.id) throw new ResourceNotFoundError();

    return {
      userProfile: {
        id: userProfile.id,
        displayName: userProfile.displayName,
        photoURL: userProfile.photoURL,
        description: userProfile.description,
      },
    };
  }
}

export function createUserProfileRouter() {
  const userProfileController = container.resolve(UserProfileController);

  const router = Router();

  router
    .get('/:id', (req, res, next) => {
      userProfileController
        .get(req)
        .then((resp) => res.json(resp))
        .catch(next);
    })
    .post('/:id', (req, res, next) => {
      userProfileController
        .update(req)
        .then((resp) => res.json(resp))
        .catch(next);
    });

  return router;
}
