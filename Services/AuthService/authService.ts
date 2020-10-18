// Load modules

const Jwt = require('@hapi/jwt');
require('dotenv').config();
const APP_SECRET = process.env.APP_SECRET;
// Generate a Token

export const token = Jwt.token.generate(
  {
    aud: 'urn:audience:test',
    iss: 'urn:issuer:test',
    user: 'some_user_name',
    group: 'hapi_community',
  },
  {
    key: APP_SECRET,
    algorithm: 'HS512',
  },
  {
    ttlSec: 14400, // 4 hours
  }
);

// Decode a token

const decodedToken = Jwt.token.decode(token);

// Greate funtion to verify a token

export const verifyToken = (artifact: any, secret: any, options = {}) => {
  try {
    Jwt.token.verify(artifact, secret, options);
    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      error: err.message,
    };
  }
};

// Get response of a succesful verification

export const validResponse = verifyToken(decodedToken, APP_SECRET);

// Get response of a unsuccessful verification due to wrong shared secret

export const badSecretResponse = verifyToken(decodedToken, APP_SECRET);

// Get response of a unsuccessful verification due to wrong iss

export const badIssResonse = verifyToken(decodedToken, APP_SECRET, {
  iss: 'urn:issuer:different_test',
});

export const generateToken = (callback: Function) => {
  let genertedTOken = token;
  return callback(null, genertedTOken);
};
