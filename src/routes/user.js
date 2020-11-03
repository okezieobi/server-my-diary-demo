export default (Router, { handleResponse, controllers, validations }) => {
  const router = Router();

  router.post('/signup', [...[validations.user.signup], controllers.user.signup], handleResponse);

  router.post('/login', [...[validations.user.login], controllers.user.login], handleResponse);

  return router;
};
