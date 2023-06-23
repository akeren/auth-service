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
