const KJUR = require('jsrsasign');

const alg = 'HS256';

const getHeader = () => ({
  alg,
  typ: 'JWT'
});

const getPayloadDefaults = () => ({

});

const createPayload = (payload) => ({
  ...getPayloadDefaults(),
  ...payload,
});

const createJwt = (payload) => KJUR.jws.JWS.sign(
  "HS256",
  JSON.stringify(getHeader()),
  JSON.stringify(createPayload(payload)),
  process.env.SESSION_SECRET,
);

const isValid = (jwt) => KJUR.jws.JWS.verifyJWT(jwt, process.env.SESSION_SECRET, {alg: [alg]});

module.exports = {
  createJwt,
  isValid,
};
