const Boom = require('@hapi/boom');
const sendError = (error, data) => {
  console.log(error);
  if (Boom.isBoom(error)) {
    return error;
  }
  if (error.name === 'MongooseError') {
    return Boom.boomify(error);
  }
};

const sendSuccess = (data, message) => {
  if (typeof message === 'string' || message instanceof String) {
    return {
      statusCode: 200,
      message: message,
      data: data,
    };
  }
  return {
    ...message,
    data: data,
  };
};

module.exports = {
  sendError: sendError,
  sendSuccess: sendSuccess,
};
