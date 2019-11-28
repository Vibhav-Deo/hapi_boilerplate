const mongoose = require('mongoose')
const debug = require('debug')('app:DB-->')
const CONFIG = require('../../Configuration/dbConfig')

const setupDB = () => {
    var db = new mongoose.mongo.MongoClient(`${CONFIG.ADAPTER}://${CONFIG.HOST}:${CONFIG.PORT}/${CONFIG.DBNAME}`, { useNewUrlParser: true });
    var userExists = false;
    db.connect((error, result) => {
        if (error) debug(error)

        result.db(CONFIG.DBNAME)
            .command({ usersInfo: { user: CONFIG.USERNAME, db: CONFIG.DBNAME }, showCredentials: false, showPrivileges: false })
            .then(result => {
                userExists = true
                if (userExists === false) {
                    result.db(CONFIG.DBNAME).command({ createUser: CONFIG.USERNAME, pwd: CONFIG.PASSWORD, roles: ["readWrite"] }, (error, result) => {
                        if (error) debug(error)

                        debug('User created')
                    })
                }
                else {
                    debug('User Exists Proceeding........')
                }
            })
            .catch(error => {
                debug(error)
            })
    })

}
const initDB = () => {
    const options = {
        useNewUrlParser: true,
    };
    const connectionString = `${CONFIG.ADAPTER}://${CONFIG.USERNAME}:${CONFIG.PASSWORD}@${CONFIG.HOST}:${CONFIG.PORT}/${CONFIG.DBNAME}`;

    mongoose.connect(connectionString, options)
        .then(() => {
            debug('Connected to DB')
        })
        .catch((error) => {
            debug(error)
        })
}

module.exports = {
    initDB: initDB,
    setupDB: setupDB
}