export default (Router, handleResponse, {
  user: { getUser },
}) => {
  const router = Router();

  router.get('/profile', getUser, handleResponse);

  return router;
};
