import { checkSchema } from 'express-validator';

import UserSchema from './user';

export default {
  userSchema: new UserSchema(checkSchema),
};
