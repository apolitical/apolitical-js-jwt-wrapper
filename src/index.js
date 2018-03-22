const KJUR = require('jsrsasign');

const { sign, verifyJWT } = KJUR.jws.JWS;

const alg = 'HS256';

const getHeader = () => ({
  alg,
  typ: 'JWT',
});

const getPayloadDefaults = () => ({

});

const createPayload = (payload) => ({
  ...getPayloadDefaults(),
  ...payload,
});

const jwtCreator = (secret) => (payload) => sign(
  'HS256',
  JSON.stringify(getHeader()),
  JSON.stringify(createPayload(payload)),
  secret,
);

const jwtValidator = (secret) => (jwt) => {
  try {
    return verifyJWT(jwt, secret, { alg: [alg] });
  } catch (e) {
    return false;
  }
};

const jwtPayloadExtractor = (secret) => (jwt) => {
  const isValid = jwtValidator(secret);
  if (!isValid(jwt)) {
    throw new Error('JWT is not valid');
  }
  return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
};

module.exports = {
  jwtCreator,
  jwtValidator,
  jwtPayloadExtractor,
};
