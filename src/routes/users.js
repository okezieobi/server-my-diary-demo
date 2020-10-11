import { Router } from 'express';

import validations from '../validations';
import passport from '../utils/passport';
import jwt from '../utils/jwt';

const router = Router();

const handleResponse = ({ user: { user, status } }, res) => {
  const token = jwt.generate(user);
  res.status(status).send({ data: { token, user, status } });
};

router.post('/signup', [...[validations.signup], passport.authenticate('signup', { session: false })], handleResponse);

router.post('/login', [...[validations.login], passport.authenticate('login', { session: false })], handleResponse);

export default router;
