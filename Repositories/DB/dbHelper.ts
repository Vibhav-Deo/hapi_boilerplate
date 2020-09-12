import { Error } from 'mongoose';

import mongoose from 'mongoose';
import { MongoClient, MongoError } from 'mongodb';
const debug = require('debug')('app:DB-->');
import { CONFIG } from '../../Configuration/dbConfig';

export const setupDB = () => {
  const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
  const DB = new MongoClient(
    `${CONFIG.ADAPTER}://${CONFIG.HOST}:${CONFIG.PORT}/${CONFIG.DBNAME}`,
    OPTIONS
  );

  var userExists = false;
  DB.connect((error: MongoError, result: MongoClient) => {
    if (error) debug(error);

    result
      .db(CONFIG.DBNAME)
      .command({
        usersInfo: { user: CONFIG.USERNAME, db: CONFIG.DBNAME },
        showCredentials: false,
        showPrivileges: false,
      })
      .then((result: any) => {
        if (result === null) {
          result
            .db(CONFIG.DBNAME, {
              noListener: false,
              returnNonCachedInstance: true,
            })
            .command(
              {
                createUser: CONFIG.USERNAME,
                pwd: CONFIG.PASSWORD,
                roles: ['readWrite'],
              },
              (error: Error, result: any) => {
                if (error) debug(error);

                debug('User created');
              }
            );
        } else {
          debug('User exists proceeding...........');
        }
      })
      .catch((error: MongoError) => {
        debug(error);
      });
  });
};
export const initDB = () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const CONNECTION_STRING = `${CONFIG.ADAPTER}://${CONFIG.USERNAME}:${CONFIG.PASSWORD}@${CONFIG.HOST}:${CONFIG.PORT}/${CONFIG.DBNAME}`;

  MongoClient.connect(CONNECTION_STRING, options)
    .then(() => {
      debug('Connected to DB');
    })
    .catch((error: Error) => {
      debug(error);
    });
};
