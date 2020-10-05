import { validationResult } from 'express-validator';

import UserSchema from './user';

const handleValidationErr = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ message: errors.array(), status: 400 });
};

export default {
  signup: [UserSchema.validateSignup(), handleValidationErr],
};
