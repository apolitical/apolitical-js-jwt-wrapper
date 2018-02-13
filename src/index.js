const KJUR = require('jsrsasign');

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

const jwtCreator = (secret) => (payload) => KJUR.jws.JWS.sign(
  'HS256',
  JSON.stringify(getHeader()),
  JSON.stringify(createPayload(payload)),
  secret,
);

const jwtValidator = (secret) => (jwt) => KJUR.jws.JWS.verifyJWT(jwt, secret, { alg: [alg] });

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
