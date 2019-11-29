const Controller = require('../../Controllers');
const Joi = require('joi');
const Config = require('../../Configuration/appConstants')

var demoApi = {
    method: "GET",
    path: "/demo/api/{name}",
    config: {
        description: "Demo API",
        tags: ["api", "demo"],
        handler: function (request, h) {
            return new Promise((resolve, reject) => {
                Controller.DemoBaseController.demoFunction(request.params, function (
                    err,
                    data
                ) {
                    if (err) reject(Config.STATUS_MSG.ERROR.DEFAULT);
                    else
                        resolve(Config.STATUS_MSG.SUCCESS.DEFAULT);
                });
            });
        },
        validate: {
            params: {
                name: Joi.string().required()
            }
        },
        plugins: {
            "hapi-swagger": {
                responseMessages: Config.swaggerDefaultResponseMessages
            }
        }
    }
};

var DemoBaseRoute = [demoApi];
module.exports = DemoBaseRoute;
