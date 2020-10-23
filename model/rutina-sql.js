const connection = require('./client');
const uuid = require('uuid');

const rutina = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS rutina (' +
        'idrutina uuid DEFAULT PRIMARY KEY, ' +
        'fecha_inspeccion TIMESTAMP NOT NULL, ' +
        'fecha_periodicidad TIMESTAMP NOT NULL, ' +
        'valor_patron VARCHAR NOT NULL, ' +
        'valor_medido VARCHAR NOT NULL, ' +
        'equipo_apto_uso BOOLEAN NOT NULL, ' +
        'observacion VARCHAR NOT NULL, ' +
        'firma VARCHAR NOT NULL, ' +
        'FOREIGN KEY (user) REFERENCES user (iduser)' +
        'FOREIGN KEY (equipo) REFERENCES equipo (idequipo)' +
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

    function getRutinaById(id) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM rutina WHERE idrutina = ${id};`;
            connection.sqlQuery(sqlQuery).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function insertRutina(rutina) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO rutina VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING idrutina';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        rutina.fecha_inspeccion,
                        equipo.fecha_periodicidad,
                        equipo.valor_patron,
                        equipo.valor_medido,
                        equipo.equipo_apto_uso,
                        equipo.observacion,
                        equipo.firma,
                        equipo.user,
                        equipo.equipo
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
        getRutinaById: getRutinaById
    }

})();

module.exports = rutina;