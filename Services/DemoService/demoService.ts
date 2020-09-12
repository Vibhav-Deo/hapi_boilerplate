import { Error } from 'mongoose';

export const demoFunction = function (payloadData: any, callback: Function) {
  return callback(new Error('Some thing went wrong'), payloadData);
};
