export interface IUserProfileUpdateRequest {
  id: string;
  displayName?: string;
  photo?: Uint8Array | string;
  description?: string;
}
