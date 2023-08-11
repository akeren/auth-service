import { IUserDocument } from '../models';

export class UserDto {
  public email: string;
  public createdAt: string;
  public updatedAt: string;
  public id: string;

  constructor(user: IUserDocument) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
