import controllers from '../controllers';
import validations from '../validations';

const handleResponse = (req, res) => {
  res.status(res.locals.data.status).send({ data: res.locals.data });
};

export default (Router) => {
  const router = Router();
  router.route('/')
    .post([...[validations.entry.create], controllers.entry.createOne], handleResponse);

  return router;
};
