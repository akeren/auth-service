import { Schema, model } from 'mongoose';
import { IUser, IUserModel, IUserDocument } from './index';
import { Password } from '../utils';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        ret.created_at = ret.createdAt;
        ret.updated_at = ret.updatedAt;
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (next): Promise<void> {
  if (!this.isModified('password')) {
    return next();
  }

  const hashedPassword = await Password.hash(this.password);

  this.password = hashedPassword;

  next();
});

userSchema.statics.build = (attributes: IUser): IUserDocument => {
  return new User(attributes);
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export { User };
