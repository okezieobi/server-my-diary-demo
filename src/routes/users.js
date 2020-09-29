import { Router } from 'express';

import controllers from '../controllers';
import validations from '../validations';
import passport from '../utils/passport';

const router = Router();

router.use(validations.userSchema.validatePassword);
router.post('/signup', [validations.userSchema.validateSignup,
  passport.authenticate('signup')], controllers.UserController.create);

export default router;
