import { IUserProfileDocument } from '../document/IUserProfileDocument';
import { IConverterBase } from './IConverterBase';
import { UserProfile } from '@/domain/user/model/UserProfile';
import { Component } from '@/lib/common/di/decorator';
import { ObjectId, OptionalId } from 'mongodb';

@Component
export class UserProfileDocumentConverter
  implements IConverterBase<UserProfile, OptionalId<IUserProfileDocument>>
{
  convertFromEntity(entity: UserProfile): OptionalId<IUserProfileDocument> {
    const document: OptionalId<IUserProfileDocument> = {
      displayName: entity.displayName,
      photoURL: entity.photoURL,
      description: entity.description,
    };
    if (entity.id) document._id = new ObjectId(entity.id);

    return document;
  }

  convertToEntity(document: OptionalId<IUserProfileDocument>): UserProfile {
    return new UserProfile(
      document.displayName,
      document.photoURL,
      document.description,
      document._id?.toHexString()
    );
  }
}
