import * as AuthService from '../../Services';
import { object, string } from '@hapi/joi';
import { swaggerDefaultResponseMessages } from '../../Configuration/appConstants';
import { sendError, sendSuccess, generateRandomString } from '../../Utilities';

var authApi = {
  method: 'GET',
  path: '/auth/api/token',
  options: {
    description: 'Token API',
    tags: ['api', 'token'],
    auth: false,
    handler: async function (request: any, h: any) {
      return await AuthService.generateToken(function (
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

var AuthRoute = [authApi];
export default AuthRoute;
