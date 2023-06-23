import { Schema, Types, Document, Model, model } from 'mongoose';

export interface IArticle {
  title: string;
  content: string;
  author: string;
}

export interface IArticleDocument extends Document {
  title: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface IArticleModel extends Model<IArticleDocument> {
  build(attributes: IArticle): IArticleDocument;
}

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
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

articleSchema.statics.build = (attributes: IArticle): IArticleDocument => {
  return new Article(attributes);
};

export const Article = model<IArticleDocument, IArticleModel>('Article', articleSchema);
