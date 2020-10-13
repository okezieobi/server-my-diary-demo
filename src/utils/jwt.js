import jwt from 'jsonwebtoken';

import env from './env';

export default class JWT {
  static generate(user) {
    return jwt.sign({
      userId: user.id,
    }, env.JwtSecret, {
      expiresIn: 24 * 60 * 60,
    });
  }

  static verify({ token }) {
    return jwt.sign(token, env.JwtSecret);
  }
}
