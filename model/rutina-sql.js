const connection = require('./client');
const uuid = require('uuid');

const rutina = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS rutinaMantenimiento (' +
        'idrutina uuid PRIMARY KEY, ' +
        'userid uuid NOT NULL, ' +
        'equipoid uuid NOT NULL, ' +
        'fecha_inspeccion TIMESTAMP NOT NULL, ' +
        'fecha_periodicidad TIMESTAMP NOT NULL, ' +
        'valor_patron VARCHAR NOT NULL, ' +
        'valor_medido VARCHAR NOT NULL, ' +
        'equipo_apto_uso BOOLEAN NOT NULL, ' +
        'observacion VARCHAR NOT NULL, ' +
        'firma VARCHAR NOT NULL ' +
        ');';

    function validateExists() {
        return new Promise((resolve, reject) => {
            connection.sqlQuery(createTable).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function getRutinaById(id) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM rutinaMantenimiento WHERE idrutina = ${id};`;
            connection.sqlQuery(sqlQuery).then((res) => {
                resolve(res.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function getAllRutinas() {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM rutinaMantenimiento;`;
            connection.sqlQuery(sqlQuery).then((res) => {
                resolve(res.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function insertRutina(rutina) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO rutinaMantenimiento VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING idrutina';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        rutina.userid,
                        rutina.equipoid,
                        rutina.fecha_inspeccion,
                        rutina.fecha_periodicidad,
                        rutina.valor_patron,
                        rutina.valor_medido,
                        rutina.equipo_apto_uso,
                        rutina.observacion,
                        rutina.firma
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
        insertRutina: insertRutina,
        getRutinaById: getRutinaById,
        getAllRutinas: getAllRutinas
    }

})();

module.exports = rutina;