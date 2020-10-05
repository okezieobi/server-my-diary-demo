import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import services from '../services';

passport.use('signup', new LocalStrategy({
  passReqToCallback: true,
}, async ({ body }, username, password, done) => {
  try {
    const user = await services.UserServices.findWithUnique(body);
    if (user) done({ message: 'User already exists with either email or username, please sign in', status: 404 });
    else done(null, body);
  } catch (err) {
    done(err);
  }
}));

export default passport;
