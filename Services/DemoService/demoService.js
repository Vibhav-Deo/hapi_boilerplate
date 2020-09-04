const { Error } = require('mongoose');

var demoFunction = function (payloadData, callback) {
  return callback(new Error(), payloadData);
};

module.exports = {
  demoFunction: demoFunction,
};
