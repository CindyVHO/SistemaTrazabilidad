
const { Pool, Client } = require('pg');

const connection = (()=>{
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'admin',
        port: 5432
    });

    function sqlQuery(query){
        return new Promise(async (resolve, reject)=>{
            try{
                await client.connect();
            } catch(err) {
                console.error("CLIENT ALREADY CONNECTED");
            }
            client.query(query, (err, res)=>{
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    return {
        sqlQuery: sqlQuery
    }
})();


module.exports = connection;