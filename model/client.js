
const { Pool, Client } = require('pg');

const connection = (()=>{
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'public',
        password: 'admin',
        port: 5432
    });

    function sqlQuery(query){
        return new Promise((resolve, reject)=>{
            try{
                client.connect();
                client.query(query, (err, res)=>{
                    client.end();
                    if(err) {
                        reject(err);
                        return;
                    }
                    resolve(res);
                });
            } catch(err) {
                reject(err);
            }
        });
    }
    return {
        sqlQuery: sqlQuery
    }
})();


module.exports = connection;