'use strict';

const HAPI = require('@hapi/hapi');
const APP_CONSTANTS = require('./Configuration/appConstants');
const ROUTES = require('./Controllers');
const SERVICES = require('./Repositories');
const debug = require('debug')('app:SERVER-->');
const Plugins = require('./Plugins');

const init = async () => {
  SERVICES.DBHELPER.setupDB();
  SERVICES.DBHELPER.initDB();

  var server = new HAPI.Server({
    app: {
      name: APP_CONSTANTS.SERVER.APP_NAME,
    },
    port: APP_CONSTANTS.SERVER.PORT,
    host: APP_CONSTANTS.SERVER.HOST,
    routes: { cors: true },
  });

  //Register All Plugins
  await server.register(Plugins, {}, (err) => {
    if (err) {
      server.log(['error'], 'Error while loading plugins : ' + err);
    } else {
      server.log(['info'], 'Plugins Loaded');
    }
  });

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
    ROUTES.forEach((route) => {
      server.route(route);
    });
  } catch (error) {
    debug('Error while fetching routes', error);
  }

  server.events.on('response', function (request) {
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
    if (request.params) debug('Request params', request.params);
  });

  //Register plugins

  await server.start();
  debug('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
  debug(err);
  process.exit(1);
});
init();
