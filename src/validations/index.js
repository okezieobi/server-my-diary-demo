import { checkSchema, validationResult } from 'express-validator';

import UserSchema from './user';

export default {
  userSchema: new UserSchema(checkSchema),
  handleValidationErr: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) next();
    else next(errors.array());
  },
};
