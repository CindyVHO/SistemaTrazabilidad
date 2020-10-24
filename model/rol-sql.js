const connection = require('./client');
const uuid = require('uuid');

const rol = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS roles (' +
        'idrol uuid PRIMARY KEY, ' +
        'rol VARCHAR NOT NULL' +
        ');';

    function getRolByName(rol) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM roles WHERE rol like'%${rol}%'`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function getRolById(id) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM roles WHERE idrol='${id}'`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function getAllRoles() {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM roles`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function validateExists() {
        return new Promise((resolve, reject) => {
            console.log("CREANDO TABLA")
            connection.sqlQuery(createTable).then(() => {
                console.log("CREANDO TABLA FINALIZADO EXIGTO")
                resolve();
            }).catch((err) => {
                console.log("CREANDO TABLA FINALIZADO ERROR", err);
                reject();
            });
        });
    }

    function insertRol(rol) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO roles VALUES ($1,$2) RETURNING idrol';
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
        insertRol: insertRol,
        getRolById: getRolById,
        getAllRoles: getAllRoles,
        getRolByName: getRolByName
    }

})();

module.exports = rol;