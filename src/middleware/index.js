import services from '../services';
import UserMiddleware from './user';

const user = new UserMiddleware(services);

export default {
  user,
};
