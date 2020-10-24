const connection = require('./client');
const uuid = require('uuid');

const equipo = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS equipos (' +
        'idequipo uuid PRIMARY KEY, ' +
        'nombre VARCHAR NOT NULL, ' +
        'codigo VARCHAR NOT NULL, ' +
        'serie VARCHAR NOT NULL, ' +
        'nombre_fabricante VARCHAR NOT NULL, ' +
        'pais_fabricante VARCHAR NOT NULL, ' +
        'correo_fabricante VARCHAR NOT NULL, ' +
        'contacto_fabricante VARCHAR NOT NULL, ' +
        'web_fabricante VARCHAR NOT NULL, ' +
        'manual_partes BOOLEAN NOT NULL, ' +
        'manual_operacion BOOLEAN NOT NULL, ' +
        'manual_servicio BOOLEAN NOT NULL, ' +
        'manual_otros VARCHAR NOT NULL, ' +
        'plano_electricos BOOLEAN NOT NULL, ' +
        'plano_electronico BOOLEAN NOT NULL, ' +
        'plano_hidraulico BOOLEAN NOT NULL, ' +
        'plano_neumatico BOOLEAN NOT NULL, ' +
        'marca VARCHAR NOT NULL, ' +
        'modelo VARCHAR NOT NULL ' +
        ');';

    function validateExists() {
        return new Promise((resolve, reject) => {
            connection.sqlQuery(createTable).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function queryAll() {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM equipos`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function queryEquipoById(id) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM equipos WHERE idequipo='${id}'`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function insertEquipo(equipo) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO equipos VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING idequipo';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        equipo.nombre,
                        equipo.codigo,
                        equipo.serie,
                        equipo.nombreFabricante,
                        equipo.paisFabricante,
                        equipo.correoFabricante,
                        equipo.contactoFabricante,
                        equipo.webFabricante,
                        equipo.manualPartes,
                        equipo.manualOperacion,
                        equipo.manualServicio,
                        equipo.manualOtros,
                        equipo.planoElectrico,
                        equipo.planoElectronico,
                        equipo.planoHidraulico,
                        equipo.planoNeumatico,
                        equipo.marca,
                        equipo.modelo
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
        insertEquipo: insertEquipo,
        queryEquipoById: queryEquipoById,
        queryAll: queryAll
    }

})();

module.exports = equipo;