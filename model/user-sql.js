const connection = require('./client');
const uuid = require('uuid');

const user = (() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS users (' +
        'iduser uuid PRIMARY KEY, ' +
        'rol uuid NOT NULL, ' +
        'name VARCHAR NOT NULL, ' +
        'lastname VARCHAR NOT NULL, ' +
        'especialidad VARCHAR ' +
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

    function getUserById(id) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE iduser='${id}'`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function getAllUsers() {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users`;
            connection.sqlQuery(sqlQuery).then((result)=>{
                resolve(result.rows);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    function insertUser(user) {
        return new Promise((resolve, reject) => {
            validateExists().then(() => {
                let sqlQuery = 'INSERT INTO users VALUES ($1,$2,$3,$4,$5) RETURNING iduser';
                let query = {
                    text: sqlQuery,
                    values: [
                        uuid.v1(),
                        user.rol,
                        user.name,
                        user.lastname,
                        user.especialidad
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
        insertUser: insertUser,
        getAllUsers: getAllUsers,
        getUserById: getUserById
    }

})();

module.exports = user;