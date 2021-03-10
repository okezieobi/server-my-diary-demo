export default (Router, handleResponse, {
  user: {
    signup, login, logout,
  },
}) => {
  const router = Router();

  router.post('/signup', signup, handleResponse);

  router.post('/login', login, handleResponse);

  router.post('/logout', logout, handleResponse);

  return router;
};
