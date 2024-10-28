import { Entity } from '@/domain/base/model/Entity';

export interface IDaoBase<IdType, EntityType extends Entity<IdType>> {
  findById: (id: IdType) => Promise<EntityType | null>;
  create: (entity: EntityType) => Promise<IdType>;
  update: (entity: EntityType) => Promise<void>;
  delete?: (id: IdType) => Promise<void>;
}
