import { Router } from 'express';

import controllers from '../controllers';
import validations from '../validations';
import passport from '../utils/passport';

const router = Router();

router.post('/signup', [validations.UserSchema.validateSignup(),
  validations.handleValidationErr,
  passport.authenticate('signup', { session: false })], controllers.UserController.create);

export default router;
