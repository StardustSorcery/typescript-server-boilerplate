import { IUserProfileUpdateRequest } from '../model/IUserProfileUpdateRequest';
import { Component } from '@/lib/common/di/decorator';
import { Validator } from '@/lib/common/validator/Validator';
import { zodSchemaForType } from '@/lib/common/validator/zodSchemaForType';
import { z } from 'zod';

@Component
export class UserProfileUpdateRequestValidator extends Validator<IUserProfileUpdateRequest> {
  constructor() {
    super(
      zodSchemaForType<IUserProfileUpdateRequest>(
        z.object({
          id: z.string(),
          displayName: z.string().optional(),
          photo: z.custom<Uint8Array | string>().optional(),
          description: z.string().optional(),
        })
      )
    );
  }
}
