import { registerController } from './register.controller';
import { loginController } from './login.controller';
import { logoutController } from './logout.controller';
import { profileController } from './profile.controller';
import { createArticle, getAllArticles, getArticle, getAuthorArticles } from './article/article.controller';

export {
  registerController,
  loginController,
  profileController,
  logoutController,
  createArticle,
  getAllArticles,
  getArticle,
  getAuthorArticles,
};
