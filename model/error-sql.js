const connection = require('./client');
const uuid = require('uuid');

const error = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS errores (' +
        'iderror uuid PRIMARY KEY, ' +
        'userid uuid NOT NULL, ' +
        'equipoid uuid NOT NULL, ' +
        'observaciones VARCHAR NOT NULL, ' +
        'fecha_reporte TIMESTAMP NOT NULL' +
        ');';

        function getErrorById(id) {
            return new Promise((resolve, reject) => {
                let sqlQuery = `SELECT * FROM errores WHERE iderror='${id}'`;
                connection.sqlQuery(sqlQuery).then((result)=>{
                    resolve(result.rows);
                }).catch((err) => {
                    reject(err);
                });
            });
        }
    
        function getAllErrores() {
            return new Promise((resolve, reject) => {
                let sqlQuery = `SELECT * FROM errores`;
                connection.sqlQuery(sqlQuery).then((result)=>{
                    resolve(result.rows);
                }).catch((err) => {
                    reject(err);
                });
            });
        }

    function validateExists() {
        return new Promise((resolve, reject) => {
            connection.sqlQuery(createTable).then((res) => {
                resolve(res);
            }).catch((err) => {
                console.log("ERROR TABLA", err);
                reject(err);
            });
        });
    }

    function insertError(error) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO errores VALUES ($1,$2,$3,$4,$5) RETURNING iderror';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        error.userid,
                        error.equipoid,
                        error.observaciones,
                        error.fecha_reporte
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
        insertError: insertError,
        getErrorById: getErrorById,
        getAllErrores: getAllErrores
    }

})();

module.exports = error;