import { Router } from 'express';

import userRoutes from './user';
import entryRoutes from './entry';
import middleware from '../middleware';
import validations from '../validations';
import controllers from '../controllers';
import jwt from '../utils/jwt';

const router = Router();
const handleResponse = (req, res) => {
  if (res.locals.data.user) {
    res.locals.data.token = jwt.generate(res.locals.data.user);
    res.status(res.locals.data.status).set('token', res.locals.data.token).send({ data: res.locals.data });
  } else {
    res.status(res.locals.data.status).send({ data: res.locals.data });
  }
};

router.use('/auth', userRoutes(Router, { handleResponse, controllers, validations }));
router.use([...[validations.user.jwt], middleware.user.findById]);
router.use('/entries', entryRoutes(Router, {
  handleResponse, validations, controllers, middleware,
}));

export default router;
