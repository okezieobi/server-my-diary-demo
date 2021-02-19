export default (Router, handleResponse, {
  user: {
    signup, login, logout, jwt, getUser,
  },
}) => {
  const router = Router();

  router.post('/signup', signup, handleResponse);

  router.post('/login', login, handleResponse);

  router.post('/logout', logout, handleResponse);

  router.use(jwt);

  router.get('/profile', getUser, handleResponse);

  return router;
};
