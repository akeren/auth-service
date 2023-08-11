import { Router } from 'express';
import { getAuthorArticles } from '../../controllers';
import { currentUser, requireAuth } from '../../middlewares';

const router: Router = Router();

router.use(currentUser);
router.use(requireAuth);

router.route('/me').get(getAuthorArticles);

export { router as getAuthorArticlesRouter };
