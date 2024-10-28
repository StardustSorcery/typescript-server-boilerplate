import { IUserProfileDocument } from '../document/IUserProfileDocument';
import { Singleton } from '@/lib/common/di/decorator';
import { Collection, MongoClient } from 'mongodb';

@Singleton
export class MongoConfig {
  public readonly client: MongoClient;
  public readonly collections: {
    userProfiles: Collection<IUserProfileDocument>;
  };

  constructor() {
    const url = `mongodb://${process.env.MONGO_USERNAME ?? 'user'}:${
      process.env.MONGO_PASSWORD ?? 'password'
    }@${process.env.MONGO_HOST ?? 'localhost'}:${process.env.MONGO_PORT ?? '27017'}/${
      process.env.MONGO_DATABASE ?? 'typescript_server_boilerplate'
    }?authSource=admin`;

    const client = (this.client = new MongoClient(url));
    const db = client.db();

    this.collections = {
      userProfiles: db.collection<IUserProfileDocument>('user_profiles'),
    };
  }
}
