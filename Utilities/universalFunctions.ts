const Boom = require('@hapi/boom');
export const sendError = (error: Error, data: object) => {
  if (Boom.isBoom(error)) {
    return error;
  }
  if (error.name === 'MongooseError') {
    return Boom.boomify(error);
  }
};

export const sendSuccess = (data: object, message: object) => {
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
