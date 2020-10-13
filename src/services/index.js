import models from '../models';
import UserServices from './user';

const user = new UserServices(models);

export default {
  user,
};
