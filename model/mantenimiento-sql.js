const connection = require('./client');
const uuid = require('uuid');

const mantenimiento = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS mantenimientos (' +
        'idmantenimiento uuid PRIMARY KEY, ' +
        'userid uuid NOT NULL, ' +
        'equipoid uuid NOT NULL, ' +
        'ubicacion_equipo VARCHAR NOT NULL, ' +
        'tipo_mantenimiento VARCHAR NOT NULL, ' +
        'material VARCHAR NOT NULL, ' +
        'diagnostico VARCHAR NOT NULL, ' +
        'trabajo_ejecutado VARCHAR NOT NULL, ' +
        'observacion_final VARCHAR NOT NULL, ' +
        'fecha TIMESTAMP NOT NULL, ' +
        'hora_inicio TIMESTAMP NOT NULL, ' +
        'hora_fin TIMESTAMP NOT NULL, ' +
        'firma VARCHAR NOT NULL ' +
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

    function getMantenimientoById(id) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM mantenimientos WHERE idmantenimiento='${id}'`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function getAllMantenimientos() {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM mantenimientos`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function insertMantenimiento(mantenimiento) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO mantenimientos VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING idmantenimiento';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        mantenimiento.userid,
                        mantenimiento.equipoid,
                        mantenimiento.ubicacion_equipo,
                        mantenimiento.tipo_mantenimiento,
                        mantenimiento.material,
                        mantenimiento.diagnostico,
                        mantenimiento.trabajo_ejecutado,
                        mantenimiento.observacion_final,
                        mantenimiento.fecha,
                        mantenimiento.hora_inicio,
                        mantenimiento.hora_fin,
                        mantenimiento.firma
                    ]
                };

                connection.sqlQuery(query).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    console.log("ERROR INSERTANDO", err);
                    reject(err);
                });
            }).catch((err)=>{
                reject(err);
            });

        });
    }

    return {
        insertMantenimiento: insertMantenimiento,
        getMantenimientoById: getMantenimientoById,
        getAllMantenimientos: getAllMantenimientos
    }

})();

module.exports = mantenimiento;