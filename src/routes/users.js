import validations from '../validations';
import controllers from '../controllers';
import jwt from '../utils/jwt';

export default (Router) => {
  const router = Router();
  const handleResponse = (req, res) => {
    res.locals.data.token = jwt.generate(res.locals.data.user);
    res.status(res.locals.data.status).set('token', res.locals.data.token).send({ data: res.locals.data });
  };

  router.post('/signup', [...[validations.user.signup], controllers.user.signup], handleResponse);

  router.post('/login', [...[validations.user.login], controllers.user.login], handleResponse);

  return router;
};
