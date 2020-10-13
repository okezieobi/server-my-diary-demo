import controllers from '../controllers';

const handleResponse = (req, res) => {
  res.status(res.locals.data.status).send({ data: res.locals.data });
};

export default (Router) => {
  const router = Router();
  router.post('/', controllers.entry.createOne, handleResponse);

  return router;
};
