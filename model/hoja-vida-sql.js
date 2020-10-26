const connection = require('./client');
const uuid = require('uuid');

const hojaVida = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS hojas_de_vida (' +
        'idhojavida uuid PRIMARY KEY, ' +
        'equipo uuid NOT NULL, ' +
        'tipo_riesgo VARCHAR NOT NULL, ' +
        'tipo_funcion VARCHAR NOT NULL, ' +
        'voltaje_maximo DECIMAL NOT NULL, ' +
        'voltaje_minimo DECIMAL NOT NULL, ' +
        'corriente_maxima DECIMAL NOT NULL, ' +
        'corriente_minima DECIMAL NOT NULL, ' +
        'potencia DECIMAL NOT NULL, ' +
        'frecuencia DECIMAL NOT NULL, ' +
        'temperatura DECIMAL NOT NULL, ' +
        'velocidad DECIMAL NOT NULL, ' +
        'capacidad DECIMAL NOT NULL, ' +
        'presion DECIMAL NOT NULL, ' +
        'fecha_instalacion TIMESTAMP NOT NULL, ' +
        'expiracion_garantia DECIMAL NOT NULL, ' +
        'alimentacion VARCHAR NOT NULL, ' +
        'adquisicion VARCHAR NOT NULL, ' +
        'fijo BOOLEAN NOT NULL, ' +
        'movil BOOLEAN NOT NULL, ' +
        'uso VARCHAR NOT NULL ' +
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

    function getAll(id) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM hojas_de_vida`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function getHVbyID(id) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM hojas_de_vida WHERE idhojavida='${id}'`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function insertHojaVida(hojaVida) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                console.log("HOJA DE VIDA TABLA CREADA O EXISTENTE");
                let sqlQuery = 'INSERT INTO hojas_de_vida VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING idhojavida';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        hojaVida.equipoid,
                        hojaVida.tipo_riesgo,
                        hojaVida.tipo_funcion,
                        hojaVida.voltaje_maximo,
                        hojaVida.voltaje_minimo,
                        hojaVida.corriente_maxima,
                        hojaVida.corriente_minima,
                        hojaVida.potencia,
                        hojaVida.frecuencia,
                        hojaVida.temperatura,
                        hojaVida.velocidad,
                        hojaVida.capacidad,
                        hojaVida.presion,
                        hojaVida.alimentacion,
                        hojaVida.adquisicion,
                        hojaVida.uso
                    ]
                };

                connection.sqlQuery(query).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    console.error("ERROR INSERTANDO", err);
                    reject(err);
                });
            }).catch((err)=>{
                reject(err);
            });

        });
    }

    return {
        insertHojaVida: insertHojaVida,
        getAll: getAll,
        getHVbyID: getHVbyID
    }

})();

module.exports = hojaVida;