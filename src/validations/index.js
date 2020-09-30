import { validationResult } from 'express-validator';

import UserSchema from './user';

export default {
  UserSchema,
  handleValidationErr: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) next();
    else next(errors.array());
  },
};
