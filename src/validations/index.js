import { validationResult, checkSchema } from 'express-validator';

import UserSchema from './user';
import EntrySchema from './entry';

const handleValidationErr = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ messages: errors.array(), status: 400 });
};

const userSchema = new UserSchema(checkSchema);
const entrySchema = new EntrySchema(checkSchema);

export default {
  user: {
    signup: [userSchema.validateSignup, handleValidationErr],
    login: [userSchema.validateLogin, handleValidationErr],
    jwt: [userSchema.validateJWT, handleValidationErr],
  },
  entry: {
    create: [entrySchema.validateCreateEntry, handleValidationErr],
    id: [entrySchema.validateEntryId, handleValidationErr],
  },
};
