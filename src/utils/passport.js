import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import services from '../services';

passport.use('signup', new LocalStrategy({
  usernameField: 'user',
  passReqToCallback: true,
}, async ({ body }, done) => {
  const user = services.UserServices.findWithUnique(body);
  if (user) done(null, false, { message: 'User already exists with either email or username, please sign in' });
  else done(null, user);
}));

export default passport;
