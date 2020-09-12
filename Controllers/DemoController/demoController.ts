import * as DemoService from '../../Services';
import { object, string } from '@hapi/joi';
import { swaggerDefaultResponseMessages } from '../../Configuration/appConstants';
import { sendError, sendSuccess } from '../../Utilities';

var demoApi = {
  method: 'GET',
  path: '/demo/api/{name}',
  options: {
    description: 'Demo API',
    tags: ['api', 'demo'],
    validate: {
      params: object({
        name: string().required(),
      }),
    },
    handler: async function (request: any, h: any) {
      return await DemoService.demoFunction(request.params, function (
        error: Error,
        data: object
      ) {
        if (error)
          return sendError(error, {
            statusCode: 400,
            message: 'something went wrong',
          });
        else {
          return sendSuccess(data, {});
        }
      });
    },
    plugins: {
      'hapi-swagger': {
        responseMessages: swaggerDefaultResponseMessages,
      },
    },
  },
};

var DemoBaseRoute = [demoApi];
export default DemoBaseRoute;
