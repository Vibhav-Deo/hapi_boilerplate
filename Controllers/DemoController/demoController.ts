import * as DemoService from '../../Services';
import { object, required, string } from '@hapi/joi';
import { swaggerDefaultResponseMessages } from '../../Configuration/appConstants';
import { sendError, sendSuccess, generateRandomString } from '../../Utilities';

var demoApi = {
  method: 'GET',
  path: '/demo/api/{name}',
  options: {
    description: 'Demo API',
    tags: ['api', 'demo'],
    auth: {
      mode: 'required',
    },
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
        if (error) return sendError(error);
        else {
          return sendSuccess(data, 'SUCCESS');
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
