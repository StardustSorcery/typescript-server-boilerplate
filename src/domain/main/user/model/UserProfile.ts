import { Entity } from '../../base/model/Entity';

export class UserProfile extends Entity<string> {
  constructor(
    public displayName: string,
    public photoURL: string,
    public description: string,
    override id?: string
  ) {
    super(id);
  }

  setDisplayName(displayName: string) {
    this.displayName = displayName;
  }

  setPhotoURL(photoURL: string) {
    this.photoURL = photoURL;
  }

  setDescription(description: string) {
    this.description = description;
  }
}
