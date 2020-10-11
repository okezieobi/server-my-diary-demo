import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import services from '../services';

passport.use('signup', new LocalStrategy({
  passReqToCallback: true,
}, async ({ body }, username, password, done) => {
  try {
    const user = await services.user.create(body);
    if (user.message) done(user);
    else done(null, user);
  } catch (err) {
    done(err);
  }
}));

passport.use('login', new LocalStrategy({
  usernameField: 'user',
}, async (username, password, done) => {
  try {
    const user = await services.user.auth({ user: username, password });
    if (user.message) done(user);
    else done(null, user);
  } catch (err) {
    done(err);
  }
}));

export default passport;
