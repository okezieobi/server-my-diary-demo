import nJwt from 'njwt';
import secureRandom from 'secure-random';

export default class JWT {
  static generate(iss, sub, scope) {
    const signingKey = secureRandom(256, { type: Buffer });
    const token = nJwt.create({ iss, sub, scope }, secureRandom);
    // @ts-ignore
    return { token: token.compact(), signingKey: signingKey.toString('base64'), tokenId: token.body.jti };
  }

  static verify(token, signingKey) {
    return nJwt.verify(token, signingKey, (err, verifiedJWT) => {
      if (err) throw err;
      return verifiedJWT;
    });
  }
}
