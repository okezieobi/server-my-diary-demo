import { validationResult, checkSchema, header } from 'express-validator';

import UserSchema from './user';
import jwt from '../utils/jwt';

const validateUserId = header('userId').isUUID();

const handleValidationErr = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ messages: errors.array(), status: 400 });
};

const verifyToken = ({ headers }, res, next) => {
  try {
    const { userId } = jwt.verify(headers);
    res.set('userId', userId);
  } catch (err) {
    next(err);
  }
};

const userSchema = new UserSchema(checkSchema);

export default {
  signup: [userSchema.validateSignup, handleValidationErr],
  login: [userSchema.validateLogin, handleValidationErr],
  jwt: [userSchema.validateJWT, handleValidationErr,
    verifyToken, validateUserId, handleValidationErr],
};
