import jwt from 'jsonwebtoken';

import env from './env';

export default class JWT {
  static async generate({ id }) {
    return jwt.sign({
      id,
    }, env.jwtSecret || '', {
      expiresIn: '6h',
    });
  }

  static async verify({ authorization }) {
    return jwt.verify(authorization, env.jwtSecret || '');
  }
}
