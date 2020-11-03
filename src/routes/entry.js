export default (Router, {
  handleResponse, controllers, validations, middleware,
}) => {
  const router = Router();

  router.route('/')
    .post([...[validations.entry.create], controllers.entry.createOne], handleResponse)
    .get([controllers.entry.findAll], handleResponse);

  router.use('/:id', [...[validations.entry.id], middleware.entry.findOneById]);
  router.route('/:id')
    .put(controllers.entry.updateOne, handleResponse)
    .get(handleResponse);

  return router;
};
