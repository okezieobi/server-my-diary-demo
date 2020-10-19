import controllers from '../controllers';
import validations from '../validations';
import middleware from '../middleware';

export default (Router) => {
  const handleResponse = (req, res) => {
    res.status(res.locals.data.status).send({ data: res.locals.data });
  };

  const router = Router();

  router.route('/')
    .post([...[validations.entry.create], controllers.entry.createOne], handleResponse)
    .get([controllers.entry.findAll], handleResponse);

  router.use('/:id', [...[validations.entry.id], middleware.entry.findOneById]);
  router.route('/:id')
    .get(handleResponse);

  return router;
};
