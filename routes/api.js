const express = require('express');
const router = express.Router();
const connection = require('../model/client');
const equipo = require('../model/equipo-sql');

router.post('/equipo', (req, res) => {
    var equipoIntro = req.body;
    equipo.insertEquipo(equipoIntro).then((res)=>{
        res.json({id:rows[0].idequipo});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

module.exports = router;