'use strict';
const Config = require('../Configuration/appConstants')
const swaggerOptions = {
    pathPrefixSize: 2,
    info: {
        'title': `${Config.SERVER.APP_NAME} API Documentation`,
        'description': `${Config.SERVER.APP_NAME} API documentation.`
    }
};

const swaggerPlugin = {
    name: 'swagger-plugin',
    version: '1.0.0',
    register: async function (server, options) {
        server.register({
            plugin: require('hapi-swagger'),
            options: swaggerOptions
        }, {}, function (err) {
            if (err) server.log(['error'], 'hapi-swagger load error: ' + err)
            else server.log(['info'], 'hapi-swagger interface loaded')
        });
    }
}

module.exports = swaggerPlugin