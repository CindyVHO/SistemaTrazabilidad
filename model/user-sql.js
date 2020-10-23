const connection = require('./client');
const uuid = require('uuid');

const user = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS user (' +
        'iduser uuid DEFAULT PRIMARY KEY, ' +
        'name VARCHAR NOT NULL, ' +
        'lastname VARCHAR NOT NULL, ' +
        'especialidad VARCHAR, ' +
        'FOREIGN KEY (rol) REFERENCES user (idrol)' +
        ');';

    function validateExists() {
        return new Promise((resolve, reject) => {
            connection.sqlQuery(createTable).then(() => {
                resolve();
            }).catch((err) => {
                reject();
            });
        });
    }

    function insertUser(user) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO user VALUES ($1,$2,$3,$4,$5) RETURNING iduser';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        user.name,
                        user.lastname,
                        user.especialidad,
                        user.rol
                    ]
                };

                connection.sqlQuery(query).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err)=>{
                reject(err);
            });

        });
    }

    return {
        insertUser: insertUser
    }

})();

module.exports = user;