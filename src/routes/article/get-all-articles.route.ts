import { Router } from 'express';
import { getAllArticles } from '../../controllers';

const router: Router = Router();

router.route('/').get(getAllArticles);

export { router as getAllArticlesRouter };
