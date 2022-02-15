/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { Schema, model } from 'mongoose';
import { IUser, IUserModel, IUserDocument } from '@src/models/interface';
import { Password } from '@src/utils';

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

// eslint-disable-next-line func-names
// eslint-disable-next-line consistent-return
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hashedPassword = await Password.hash(this.password);
  this.password = hashedPassword;
  next();
});

userSchema.statics.build = (attributes: IUser): IUserDocument => {
  // eslint-disable-next-line no-use-before-define
  return new User(attributes);
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export { User };
