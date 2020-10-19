import services from '../services';
import UserMiddleware from './user';
import EntryMiddleware from './entry';

const user = new UserMiddleware(services);
const entry = new EntryMiddleware(services);

export default {
  user, entry,
};
