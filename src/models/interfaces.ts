import { Model, Document } from 'mongoose';

/**
 * @description An interface that describes the properties that are required to create a new user.
 * @interface IUser
 * @property {string} email
 * @property {string} password
 */
export interface IUser {
  email: string;
  password: string;
}

/**
 * @description An interface that describes the properties that a User document has.
 * @interface IUserDocument
 * @extends {Document}
 * @property {string} email
 * @property {string} password
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
export interface IUserDocument extends Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @description An interface that describes the properties that a User model has.
 * @interface IUserModel
 * @extends {Model<IUserDocument>}
 * @property {(attributes: IUser) => IUserDocument} build
 */
export interface IUserModel extends Model<IUserDocument> {
  // eslint-disable-next-line no-unused-vars
  build(attributes: IUser): IUserDocument;
}
