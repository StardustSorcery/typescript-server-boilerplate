export interface IConverterBase<EntityType, DocumentType> {
  convertFromEntity: (entity: EntityType) => DocumentType;
  convertToEntity: (document: DocumentType) => EntityType;
}
