'use strict';

import { SERVER } from './Configuration/appConstants';
const Jwt = require('@hapi/jwt');
import { ROUTES } from './Controllers';
import * as SERVICES from './Repositories';
const debug = require('debug')('app:SERVER-->');
import { plugins } from './Plugins/plugins';
import * as Glue from '@hapi/glue';
const APP_SECRET = process.env.APP_SECRET;
import * as AuthService from './Services';
const init = async () => {
  SERVICES.setupDB();
  SERVICES.initDB();

  const manifest: Glue.Manifest = {
    server: {
      app: { name: SERVER.APP_NAME },
      port: SERVER.PORT,
      host: SERVER.HOST,
      routes: { cors: true },
    },
    register: {
      plugins: [...plugins, Jwt],
    },
  };

  const options = {
    relativeTo: __dirname,
  };

  var server = await Glue.compose(manifest, options);

  await server.auth.strategy('jwt', 'jwt', {
    keys: APP_SECRET,
    verify: {
      aud: 'urn:audience:test',
      iss: 'urn:issuer:test',
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15,
    },
    validate: (artifacts: any, request: any, h: any) => {
      return AuthService.verifyToken(artifacts, APP_SECRET);
    },
  });

  // Set the strategy

  server.auth.default('jwt');

  //add views
  await server.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './Views',
  });

  //Default Routes
  server.route({
    method: 'GET',
    path: '/',
    options: {
      auth: false,
    },
    handler: function (req, res) {
      return res.view('welcome');
    },
  });

  try {
    ROUTES.forEach((route: any) => {
      server.route(route);
    });
  } catch (error) {
    debug('Error while fetching routes', error);
  }

  server.events.on('response', (request: any) => {
    debug(
      request.info.remoteAddress +
        ': ' +
        request.method.toUpperCase() +
        ' ' +
        request.url.pathname +
        ' --> ' +
        request.response.statusCode
    );
    if (request.payload) debug('Request payload:', request.payload);
    if (request.params) debug('Request params:', request.params);
  });

  //Register plugins

  await server.start();
  debug('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (error) => {
  debug(error);
  process.exit(1);
});
init();
