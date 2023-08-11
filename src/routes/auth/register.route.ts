import { Router } from 'express';
import { registerValidation } from '../../validations';
import { registerController } from '../../controllers';
import { validateRequest } from '../../middlewares';

const router: Router = Router();

router.post('/register', registerValidation, validateRequest, registerController);

export { router as registerRouter };
