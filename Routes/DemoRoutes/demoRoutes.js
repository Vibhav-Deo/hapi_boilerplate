var Controller = require('../../Controllers');

var demoApi = {
    method: "POST",
    path: "/api/demo/demoApi",
    config: {
        description: "demo api",
        tags: ["api", "demo"],
        handler: function (request, h) {
            var userData = request.payload;
            return new Promise((resolve, reject) => {
                Controller.DemoBaseController.demoFunction(userData, function (
                    error,
                    data
                ) {
                    if (err) reject(error);
                    else
                        resolve(data);
                });
            });
        }
    }
};

var DemoBaseRoute = [demoApi];
module.exports = DemoBaseRoute;
