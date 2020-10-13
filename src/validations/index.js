import { validationResult, checkSchema, header } from 'express-validator';

import UserSchema from './user';

const validateUserId = header('userId').isUUID();

const handleValidationErr = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ messages: errors.array(), status: 400 });
};

const userSchema = new UserSchema(checkSchema);

export default {
  signup: [userSchema.validateSignup, handleValidationErr],
  login: [userSchema.validateLogin, handleValidationErr],
  jwt: [userSchema.validateJWT, handleValidationErr, validateUserId, handleValidationErr],
};
