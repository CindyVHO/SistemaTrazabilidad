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

router.get('/equipo', (req, res) => {
    var equipoIntro = req.body;
    equipo.queryAll().then((response)=>{
        res.json({equipos:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/equipo/:id', (req, res) => {
    var equipoid = req.params.id;
    equipo.queryEquipoById(equipoid).then((response)=>{
        res.json({equipos:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.post('/componentes', (req, res) => {
    var componenteIntro = req.body;
    componente.insertComponente(componenteIntro).then((response)=>{
        res.json({id:response.rows[0].idcomponente});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/componentes', (req, res) => {
    componente.getAllComponentes().then((response)=>{
        res.json({componentes:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/componentes/:id', (req, res) => {
    var errorid = req.params.id;
    componente.getComponenteById(errorid).then((response)=>{
        res.json({componentes:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.post('/errores', (req, res) => {
    var errorIntro = req.body;
    error.insertError(errorIntro).then((response)=>{
        res.json({id:response.rows[0].iderror});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/errores', (req, res) => {
    error.getAllErrores().then((response)=>{
        res.json({errores:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/errores/:id', (req, res) => {
    var errorid = req.params.id;
    error.getErrorById(errorid).then((response)=>{
        res.json({errores:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.post('/hoja-vida', (req, res) => {
    var hojaVidaIntro = req.body;
    hojaVida.insertHojaVida(hojaVidaIntro).then((response)=>{
        res.json({id:response.rows[0].idhojavida});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/hoja-vida', (req, res) => {
    hojaVida.getAll().then((response)=>{
        res.json({hojasDeVida:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/hoja-vida/:id', (req, res) => {
    var hvid = req.params.id;
    hojaVida.getHVbyID(hvid).then((response)=>{
        res.json({hojasDeVida:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.post('/mantenimientos', (req, res) => {
    var mantenimientoIntro = req.body;
    mantenimiento.insertMantenimiento(mantenimientoIntro).then((response)=>{
        res.json({id:response.rows[0].idmantenimiento});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/mantenimientos', (req, res) => {
    mantenimiento.getAllMantenimientos().then((response)=>{
        res.json({mantenimientos:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/mantenimientos/:id', (req, res) => {
    var mantenimientoid = req.params.id;
    mantenimiento.getMantenimientoById(mantenimientoid).then((response)=>{
        res.json({mantenimientos:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.post('/rol', (req, res) => {
    var rolIntro = req.body;
    rol.insertRol(rolIntro).then((response)=>{
        res.json({id:response.rows[0].idrol});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/rol', (req, res) => {
    rol.getAllRoles().then((response)=>{
        res.json({roles:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/rol/:id', (req, res) => {
    var rolid = req.params.id;
    rol.getRolById(rolid).then((response)=>{
        res.json({roles:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.post('/rutinas', (req, res) => {
    var rutinaIntro = req.body;
    rutina.insertRutina(rutinaIntro).then((response)=>{
        res.json({id:response.rows[0].idrutina});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/rutinas', (req, res) => {
    rutina.getAllRutinas().then((response)=>{
        res.json({rutinas:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/rutinas/:id', (req, res) => {
    var rutinaid = req.params.id;
    user.getRutinaById(rutinaid).then((response)=>{
        res.json({rutinas:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.post('/users', (req, res) => {
    var userIntro = req.body;
    user.insertUser(userIntro).then((response)=>{
        res.json({id:response.rows[0].iduser});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/users', (req, res) => {
    user.getAllUsers().then((response)=>{
        res.json({users:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

router.get('/users/:id', (req, res) => {
    var userid = req.params.id;
    user.getRolById(userid).then((response)=>{
        res.json({users:response});
    }).catch((err)=>{
        res.status(500);
        res.send(err);
    });
});

module.exports = router;