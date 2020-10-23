const express = require('express');
const router = express.Router();
const connection = require('../model/client');
const equipo = require('../model/equipo-sql');
const componente = require('../model/componente-sql');
const error = require('../model/error-sql');
const hojaVida = require('../model/hoja-vida-sql');
const mantenimiento = require('../model/mantenimiento-sql');
const rol = require('../model/rol-sql');
const rutina = require('../model/rutina-sql');
const user = require('../model/user-sql');

router.post('/equipo', (req, res) => {
    var equipoIntro = req.body;
    equipo.insertEquipo(equipoIntro).then((response)=>{
        res.json({id:response.rows[0].idequipo});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.post('/componente', (req, res) => {
    var componenteIntro = req.body;
    componente.insertComponente(componenteIntro).then((response)=>{
        res.json({id:response.rows[0].idcomponente});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

module.exports = router;