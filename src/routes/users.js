import validations from '../validations';
import controllers from '../controllers';
import jwt from '../utils/jwt';

const handleResponse = (req, res) => {
  res.locals.data.token = jwt.generate(res.locals.data.user);
  res.status(res.locals.data.status).set('token', res.locals.data.token).send({ data: res.locals.data });
};

export default (Router) => {
  const router = Router();

  router.post('/signup', [...[validations.user.signup], controllers.user.signup], handleResponse);

  router.post('/login', [...[validations.user.login], controllers.user.login], handleResponse);

  return router;
};
