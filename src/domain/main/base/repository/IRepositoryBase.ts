import { Entity } from '../../base/model/Entity';

export interface IRepositoryBase<IdType, EntityType extends Entity<IdType>> {
  findById: (id: IdType) => Promise<EntityType | null>;
  saveAndAssignId: (entity: EntityType) => Promise<void>;
  delete?: (id: IdType) => Promise<void>;
}
