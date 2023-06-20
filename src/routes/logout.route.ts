import { Router } from 'express';
import { logoutController } from '../controllers';
import { currentUser, requireAuth } from '../middlewares';

const router: Router = Router();

router.post('/logout', currentUser, requireAuth, logoutController);

export { router as logoutRouter };
