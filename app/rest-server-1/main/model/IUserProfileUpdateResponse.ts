export interface IUserProfileUpdateResponse {
  userProfile?: {
    id: string;
    displayName: string;
    photoURL: string;
    description: string;
  };
}
