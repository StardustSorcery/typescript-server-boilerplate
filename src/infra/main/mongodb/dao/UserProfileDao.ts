import { MongoConfig } from '../config/MongoConfig';
import { UserProfileDocumentConverter } from '../converter/UserProfileDocumentConverter';
import { UserProfile } from '@/domain/user/model/UserProfile';
import { IUserProfileDao } from '@/infra/core/user/dao/IUserProfileDao';
import { Component } from '@/lib/common/di/decorator';
import { ObjectId } from 'mongodb';
import { inject } from 'tsyringe';

@Component
export class UserProfileDao implements IUserProfileDao {
  constructor(
    @inject('UserProfileDocumentConverter') readonly converter: UserProfileDocumentConverter,
    @inject('MongoConfig') readonly mongo: MongoConfig
  ) {}

  async findById(id: string): Promise<UserProfile | null> {
    const document = await this.mongo.collections.userProfiles.findOne({ _id: new ObjectId(id) });
    return document ? this.converter.convertToEntity(document) : null;
  }

  async create(entity: UserProfile): Promise<string> {
    const result = await this.mongo.collections.userProfiles.insertOne(
      this.converter.convertFromEntity(entity)
    );
    return result.insertedId.toHexString();
  }

  async update(entity: UserProfile): Promise<void> {
    await this.mongo.collections.userProfiles.updateOne(
      { _id: new ObjectId(entity.id) },
      { $set: entity }
    );
  }

  async delete(id: string): Promise<void> {
    await this.mongo.collections.userProfiles.deleteOne({
      _id: new ObjectId(id),
    });
  }
}
