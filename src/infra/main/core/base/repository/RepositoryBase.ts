import { IDaoBase } from '../dao/IDaoBase';
import { Entity } from '@/domain/base/model/Entity';
import { IRepositoryBase } from '@/domain/base/repository/IRepositoryBase';

export class RepositoryBase<
  IdType,
  EntityType extends Entity<IdType>,
  AdapterType extends IDaoBase<IdType, EntityType>,
> implements IRepositoryBase<IdType, EntityType>
{
  constructor(protected adapter: AdapterType) {}

  async findById(id: IdType): Promise<EntityType | null> {
    return await this.adapter.findById(id);
  }

  async saveAndAssignId(entity: EntityType): Promise<void> {
    if (entity.isNew) {
      const id = await this.adapter.create(entity);
      entity.assignId(id);
    } else {
      await this.adapter.update(entity);
    }
  }
}
