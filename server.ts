'use strict';

const APP_CONSTANTS = require('./Configuration/appConstants');
const ROUTES = require('./Controllers');
import * as SERVICES from './Repositories';
const debug = require('debug')('app:SERVER-->');
import { plugins } from './Plugins/plugins';
import * as Glue from '@hapi/glue';
const init = async () => {
  SERVICES.setupDB();
  SERVICES.initDB();

  const manifest: Glue.Manifest = {
    server: {
      app: { name: APP_CONSTANTS.SERVER.APP_NAME },
      port: APP_CONSTANTS.SERVER.PORT,
      host: APP_CONSTANTS.SERVER.HOST,
      routes: { cors: true },
    },
    register: {
      plugins: [...plugins],
    },
  };

  const options = {
    relativeTo: __dirname,
  };

  var server = await Glue.compose(manifest, options);

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
        JSON.stringify(request.response.source) +
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
