import { IUserProfileGetRequest } from '../model/IUserProfileGetRequest';
import { Component } from '@/lib/common/di/decorator';
import { Validator } from '@/lib/common/validator/Validator';
import { zodSchemaForType } from '@/lib/common/validator/zodSchemaForType';
import { z } from 'zod';

@Component
export class UserProfileGetRequestValidator extends Validator<IUserProfileGetRequest> {
  constructor() {
    super(
      zodSchemaForType<IUserProfileGetRequest>(
        z.object({
          id: z.string(),
        })
      )
    );
  }
}
