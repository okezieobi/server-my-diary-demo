import userRoutes from './user';
import entryRoutes from './entry';
import middleware from '../middleware';

export default (Router) => {
  const router = Router();

  const handleResponse = (req, res) => {
    res.status(res.locals.data.status || 200)
      .send({ data: res.locals.data || {} });
  };

  router.use('/auth', userRoutes(Router, handleResponse, middleware));
  router.use(middleware.user.jwt);
  router.use('/entries', entryRoutes(Router, handleResponse, middleware));

  return router;
};
