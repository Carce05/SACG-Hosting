const { response } = require('express');
const bcryptjs = require('bcryptjs')
const bitacora = require("../controllers/bitacora");
const bitacoraAccion = require("./bitacoraAccion");

const General = require('../models/general')

const generalesGet = async (req, res) => {
    try{
        const data = await General.find({ _id: req.params.generalId });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
        bitacora.log('error', "Fallo en la busqueda de la información general");
    }
}

const generalesPost = async (req, res = response) => {
    try{
        const { anio, periodo } = req.body;
    const general = new General( { anio, periodo } );

    await general.save();

    res.json({
        msg: 'POST | CONTROLLER',
        general
    })
    }
    catch (err) {
        res.status(500).send(err);
    }
    
}

const generalesPut = async(req, res) => {
    try {
        await General.updateOne({ _id: req.params.generalId }, req.body);
        const emailLoggedGlobal = global.email;
        bitacoraAccion.log('debug', `${emailLoggedGlobal} actualizó datos generales del curso lectivo`);
        res.status(200).send({
            msg: 'PUT | CONTROLLER',
            id: req.params.generalId
        })
    } catch (err) {
        res.status(500).send(err);
        bitacora.log('error', "Fallo en la actualización de datos generales del sistema");
    }
}

module.exports = {
    generalesGet,
    generalesPost,
    generalesPut
}