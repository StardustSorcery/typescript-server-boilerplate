export class Entity<IdType> {
  constructor(public id?: IdType) {}

  public assignId(id: IdType): void {
    this.id = id;
  }

  get isNew(): boolean {
    return this.id === undefined;
  }
}
