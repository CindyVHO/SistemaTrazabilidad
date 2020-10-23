const connection = require('./client');
const uuid = require('uuid');

const rol = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS rol (' +
        'idrol uuid DEFAULT PRIMARY KEY, ' +
        'rol VARCHAR NOT NULL, ' +
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

    function insertRol(rol) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO rol VALUES ($1,$2) RETURNING idrol';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        rol.rol
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
        insertRol: insertRol
    }

})();

module.exports = rol;