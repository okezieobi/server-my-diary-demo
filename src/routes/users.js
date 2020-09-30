import { Router } from 'express';

import controllers from '../controllers';
import validations from '../validations';
import passport from '../utils/passport';

const router = Router();

// router.use();
router.post('/signup', [validations.userSchema.validateSignup(),
  validations.handleValidationErr], controllers.UserController.create);

export default router;
