import { Request, Response } from 'express';
import { Article } from '../../models';

export async function createArticle(req: Request, res: Response): Promise<Response> {
  const { title, content } = req.body;

  const article = Article.build({
    title,
    content,
    author: req.currentUser?.id as string,
  });

  await article.save();

  return res.status(201).json({
    status: true,
    code: res.statusCode,
    message: 'Article created successfully!',
    data: article,
  });
}

export async function getAllArticles(req: Request, res: Response): Promise<Response> {
  const articles = await Article.find({});

  return res.status(200).json({
    status: true,
    code: res.statusCode,
    message: 'Articles retrieved successfully!',
    data: articles,
  });
}

export async function getArticle(req: Request, res: Response): Promise<Response> {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({
      status: false,
      code: res.statusCode,
      message: `There's no article associated with the ID!`,
    });
  }

  return res.status(200).json({
    status: true,
    code: res.statusCode,
    message: `Article retrieved successfully!`,
    data: article,
  });
}

export async function getAuthorArticles(req: Request, res: Response): Promise<Response> {
  const userId = String(req.currentUser?.id);

  const articles = await Article.find({ author: userId }).cache();

  return res.status(200).json({
    status: true,
    code: res.statusCode,
    message: 'Articles retrieved successfully',
    data: articles,
  });
}
