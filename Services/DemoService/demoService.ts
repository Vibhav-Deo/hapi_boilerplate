import { Error } from 'mongoose';
import { badRequest } from '@hapi/boom';

export const demoFunction = function (payloadData: any, callback: Function) {
  return callback(null, payloadData);
};
