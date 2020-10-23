const connection = require('./client');
const uuid = require('uuid');

const error = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS error (' +
        'iderror uuid DEFAULT PRIMARY KEY, ' +
        'user uuid NOT NULL, ' +
        'equipo uuid NOT NULL, ' +
        'observaciones VARCHAR NOT NULL, ' +
        'fecha_reporte TIMESTAMP NOT NULL, ' +
        'hora_reporte TIMESTAMP NOT NULL' +
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

    function insertError(error) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO error VALUES ($1,$2,$3,$4,$5,$6) RETURNING iderror';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        error.observaciones,
                        error.fecha_reporte,
                        error.hora_reporte,
                        error.user,
                        error.equipo
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
        insertError: insertError
    }

})();

module.exports = error;