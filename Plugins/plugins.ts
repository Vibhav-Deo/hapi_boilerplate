'use strict';

import HapiSwagger from 'hapi-swagger';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
const Config = require('../Configuration/appConstants');
import * as Hapi from '@hapi/hapi';

const hapiSwaggerOptions: HapiSwagger.RegisterOptions = {
  pathPrefixSize: 2,
  info: {
    title: `${Config.SERVER.APP_NAME} API Documentation`,
    description: `${Config.SERVER.APP_NAME} API documentation.`,
  },
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ jwt: [] }],
};

const visionOptions = {
  engines: {
    html: require('handlebars'),
  },
  relativeTo: __dirname,
  path: 'public',
};

export const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert,
  },
  {
    plugin: Vision,
  },
  {
    plugin: HapiSwagger,
    options: hapiSwaggerOptions,
  },
];
