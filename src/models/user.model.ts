import { Schema, model, Model, Document } from 'mongoose';
import { Password } from '../services';

export interface IUser {
  email: string;
  password: string;
}

export interface IUserDocument extends Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserModel extends Model<IUserDocument> {
  build(attributes: IUser): IUserDocument;
}

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
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;

        delete ret._id;
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
