import jwt from 'jsonwebtoken';

import models from '../models';
import env from '../utils/env';

const generateJWT = ({ id }) => jwt.sign({
  id,
}, env.jwtSecret || '', {
  expiresIn: '6h',
});

const user = {
  fullName: 'test-fullName', username: 'test-username', email: 'test@email.com', password: 'test-password',
};
const newUser = {
  fullName: 'test-fullName-new', username: 'test-username-new', email: 'test-new@email.com', password: 'test-password',
};
const userDAO = models.User.build(user);
const token = generateJWT(userDAO);
const user404 = {
  fullName: 'test-fullName-fake', username: 'test-username-fake', email: 'test-fake@email.com', password: 'test-password',
};
const user404DAO = models.User.build(user404);
const token401 = generateJWT(user404DAO);

const entry = { title: 'test-title', body: 'test-body', UserId: userDAO.id };
const entryDAO = models.Entry.build(entry);

export default {
  seed: { userDAO, entryDAO },
  token,
  user,
  entry,
  newUser,
  user404,
  user404DAO,
  token401,
  models,
};
