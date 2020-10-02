const express = require('express');
const router = express.Router();
const connection = require('../model/client');

router.get('/users', (req, res) => {
    const sql = "select * from Users;"
    connection.sqlQuery(sql).then((res)=> {
        res.send(res);
    }).catch((err)=> {
        res.status(500);
        res.send(err);
    })
    
});

router.post('/user', (req, res) => {
    var usuario = req.body.user;
    res.json("Creado exitosamente")
});

module.exports = router;