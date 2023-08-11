import { Router } from 'express';
import { createArticle } from '../../controllers';
import { clearUserCacheAfterPostCreation, currentUser, requireAuth, validateRequest } from '../../middlewares';
import { createArticleValidation } from '../../validations';

const router: Router = Router();

router.use(currentUser);
router.use(requireAuth);

router.post('/', createArticleValidation, validateRequest, clearUserCacheAfterPostCreation, createArticle);

export { router as createArticleRouter };
