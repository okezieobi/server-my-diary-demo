import nJwt from 'njwt';
import secureRandom from 'secure-random';

export default class JWT {
  static generate(iss, sub, scope = 'self') {
    const signingKey = secureRandom(256, { type: 'Buffer' });
    const keyId = new Date().toString();
    const token = nJwt.create({ iss, sub, scope }, signingKey).setHeader('keyId', keyId);
    return {
      token: token.compact(),
      keyId,
      signingKey: signingKey.toString('base64'),
      // @ts-ignore
      tokenId: token.body.jti,
    };
  }

  static verify(token, signingKeys) {
    const keys = {};
    if (signingKeys.length <= 0) throw new Error('No registered users');
    signingKeys.forEach(({ keyId, key }) => {
      keys[keyId] = key;
    });

    function myKeyResolver(kid, cb) {
      const key = keys[kid];

      if (key) {
        return cb(null, key);
      }

      return cb(new Error('Unknown kid'));
    }

    const verifier = nJwt.createVerifier().withKeyResolver(myKeyResolver);
    return verifier.verify(token, (error, verifiedJwt) => {
      if (error) throw error;
      return verifiedJwt;
    });
  }
}
