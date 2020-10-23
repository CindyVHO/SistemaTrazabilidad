const connection = require('./client');
const uuid = require('uuid');
const rutina = require('./rutina-sql');

const componente = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS componente (' +
        'idcomponente uuid DEFAULT PRIMARY KEY, ' +
        'rutina uuid NOT NULL, ' +
        'componente VARCHAR NOT NULL, ' +
        'funcionamiento BOOLEAN NOT NULL, ' +
        'observaciones VARCHAR NOT NULL, ' +
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

    function insertComponente(componente) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO componente VALUES ($1,$2,$3,$4,$5) RETURNING idcomponente';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        componente.rutina.idrutina,
                        componente.componente,
                        componente.funcionamiento,
                        componente.observaciones,
                        componente.rutina
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
        insertComponente: insertComponente
    }

})();

module.exports = componente;