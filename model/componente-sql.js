const connection = require('./client');
const uuid = require('uuid');
const rutina = require('./rutina-sql');

const componente = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS componentes (' +
        'idcomponente uuid PRIMARY KEY, ' +
        'rutinaid uuid NOT NULL, ' +
        'componente VARCHAR NOT NULL, ' +
        'funcionamiento BOOLEAN NOT NULL, ' +
        'observaciones VARCHAR NOT NULL' +
        ');';

        function getComponenteById(id) {
            return new Promise((resolve, reject) => {
                let sqlQuery = `SELECT * FROM componentes WHERE idcomponente='${id}'`;
                connection.sqlQuery(sqlQuery).then((result)=>{
                    resolve(result.rows);
                }).catch((err) => {
                    reject(err);
                });
            });
        }
    
        function getAllComponentes() {
            return new Promise((resolve, reject) => {
                let sqlQuery = `SELECT * FROM componentes`;
                connection.sqlQuery(sqlQuery).then((result)=>{
                    resolve(result.rows);
                }).catch((err) => {
                    reject(err);
                });
            });
        }

    function validateExists() {
        return new Promise((resolve, reject) => {
            connection.sqlQuery(createTable).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function insertComponente(componente) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO componentes VALUES ($1,$2,$3,$4,$5) RETURNING idcomponente';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        componente.rutinaid,
                        componente.componente,
                        componente.funcionamiento,
                        componente.observaciones
                    ]
                };

                connection.sqlQuery(query).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    console.log("ERROR INSERT", err);
                    reject(err);
                });
            }).catch((err)=>{
                reject(err);
            });

        });
    }

    return {
        insertComponente: insertComponente,
        getComponenteById: getComponenteById,
        getAllComponentes: getAllComponentes
    }

})();

module.exports = componente;