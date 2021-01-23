import services from '../services';
import UserController from './user';
import EntryController from './entry';

const handleServiceOutput = (data, { locals }, next) => {
  if (data.message) throw data;
  else {
    const resLocal = locals;
    resLocal.data = data;
    next();
  }
};
const user = new UserController(services, handleServiceOutput);
const entry = new EntryController(services, handleServiceOutput);

export default {
  user, entry, User: UserController,
};
