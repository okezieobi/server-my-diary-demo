import services from '../services';
import UserController from './user';
import EntryController from './entry';

const handleServices = async (service, method, input, res, next) => {
  const data = await service[method](input).catch(next);
  res.locals.data = data;
  next();
};

const user = new UserController(services, handleServices);
const entry = new EntryController(services, handleServices);

export default {
  user, entry,
};
