const assert = require('assert');
const { jwtCreator, jwtValidator, jwtPayloadExtractor } = require('./index');

describe('JWT Library', () => {
  const secret = '12345';
  describe('createJwt', () => {
    it('should look like a JWT object', () => {
      const createJwt = jwtCreator(secret);
      const jwt = createJwt({});
      assert.equal(jwt.split('.').length, 3);
    });

    it('should have a valid JWT header', () => {
      const createJwt = jwtCreator(secret);
      const jwt = createJwt({});

      const headerPart = Buffer.from(jwt.split('.')[0], 'base64').toString();
      const header = JSON.parse(headerPart);
      assert.notEqual(header.alg, undefined);
      assert.equal(header.typ, 'JWT');
    });

    it('should contain the payload', () => {
      const createJwt = jwtCreator(secret);
      const jwt = createJwt({ key: 'value' });

      const payloadPart = Buffer.from(jwt.split('.')[1], 'base64').toString();
      const payload = JSON.parse(payloadPart);
      assert.equal(payload.key, 'value');
    });

    it('should be valid', () => {
      const createJwt = jwtCreator(secret);
      const jwt = createJwt({ key: 'value' });

      const isValid = jwtValidator(secret);
      assert(isValid(jwt));
    });
  });

  describe('isValid', () => {
    it('should validate a valid JWT', () => {
      const createJwt = jwtCreator(secret);
      const jwt = createJwt({ key: 'value' });

      const isValid = jwtValidator(secret);
      assert(isValid(jwt));
    });

    it('should not validate an invalid JWT', () => {
      const createJwt = jwtCreator(secret);
      const jwt = createJwt({ key: 'value' });

      const isValid = jwtValidator('54321');
      assert(!isValid(jwt));
    });

    it('should not validate undefined', () => {
      const isValid = jwtValidator(secret);
      assert(!isValid(undefined));
    });

    it('should not validate empty string', () => {
      const isValid = jwtValidator(secret);
      assert(!isValid(''));
    });
  });

  describe('getPayload', () => {
    it('should return the payload', () => {
      const payload = { key: 'value' };

      const createJwt = jwtCreator(secret);
      const jwt = createJwt(payload);

      const getPayload = jwtPayloadExtractor(secret);
      assert.deepEqual(getPayload(jwt), payload);
    });

    it('should throw an error if the JWT is invalid', () => {
      const payload = { key: 'value' };

      const createJwt = jwtCreator(secret);
      const jwt = createJwt(payload);

      const getPayload = jwtPayloadExtractor('54321');
      assert.throws(() => getPayload(jwt), /not valid/);
    });
  });
});
