import { Router } from 'express';
import { currentUser, requireAuth } from '../middlewares';
import { profileController } from '../controllers';

const router: Router = Router();

router.get('/me', currentUser, requireAuth, profileController);

export { router as profileRouter };
