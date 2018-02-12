const KJUR = require('jsrsasign');

const getHeader = () => ({
  alg: 'HS256',
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

module.exports = {
  createJwt,
};
