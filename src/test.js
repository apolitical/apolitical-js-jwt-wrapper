const assert = require('assert');
const { createJwt, isValid } = require('./index');

describe('JWT Library', () => {
  let env;

  beforeEach(() => {
    env = process.env;
    process.env.SESSION_SECRET = '12345';
  });

  afterEach(() => {
    process.env = env;
  });


  describe('createJwt', () => {
    it('should look like a JWT object', () => {
      const jwt = createJwt({});
      assert.equal(jwt.split('.').length, 3);
    });

    it('should have a valid JWT header', () => {
      const jwt = createJwt({});
      const headerPart = Buffer.from(jwt.split('.')[0], 'base64').toString();
      const header = JSON.parse(headerPart);
      assert.notEqual(header.alg, undefined);
      assert.equal(header.typ, 'JWT');
    });

    it('should contain the payload', () => {
      const jwt = createJwt({ key: 'value' });
      const payloadPart = Buffer.from(jwt.split('.')[1], 'base64').toString();
      const payload = JSON.parse(payloadPart);
      assert.equal(payload.key, 'value');
    });

    it('should be valid', () => {
      const jwt = createJwt({ key: 'value' });
      assert(isValid(jwt));
    });
  });

  describe('isValid', () => {
    it('should validate a valid JWT', () => {
      const jwt = createJwt({key: 'value'});
      assert(isValid(jwt));
    });

    it('should not validate an invalid JWT', () => {
      const jwt = createJwt({ key: 'value'});
      process.env.SESSION_SECRET = '54321';
      assert(!isValid(jwt));
    });
  });
});
