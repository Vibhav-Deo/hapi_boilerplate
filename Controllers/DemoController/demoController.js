const Controller = require('../../Services');
const Joi = require('@hapi/joi');
const Config = require('../../Configuration/appConstants');
const UniversalFunctions = require('../../Utilities');

var demoApi = {
  method: 'GET',
  path: '/demo/api/{name}',
  options: {
    description: 'Demo API',
    tags: ['api', 'demo'],
    validate: {
      params: Joi.object({
        name: Joi.string().required(),
      }),
    },
    handler: async function (request, h) {
      return await Controller.DemoBaseController.demoFunction(
        request.params,
        function (err, data) {
          if (err)
            return UniversalFunctions.sendError(err, {
              statusCode: 400,
              message: 'something went wrong',
            });
          else {
            return UniversalFunctions.sendSuccess(data, 'Success');
          }
        }
      );
    },
    plugins: {
      'hapi-swagger': {
        responseMessages: Config.swaggerDefaultResponseMessages,
      },
    },
  },
};

var DemoBaseRoute = [demoApi];
module.exports = DemoBaseRoute;
