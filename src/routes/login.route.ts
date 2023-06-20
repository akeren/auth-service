import { Router } from 'express';
import { loginValidation } from '../validations';
import { loginController } from '../controllers';
import { validateRequest } from '../middlewares';

const router: Router = Router();

router.post('/login', loginValidation, validateRequest, loginController);

export { router as loginRouter };
