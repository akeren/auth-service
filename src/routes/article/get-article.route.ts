import { Router } from 'express';
import { getArticle } from '../../controllers';

const router: Router = Router();

router.route('/:id').get(getArticle);

export { router as getArticleRouter };
