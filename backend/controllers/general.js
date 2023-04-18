const { response } = require('express');

const bcryptjs = require('bcryptjs')

const bitacora = require("../controllers/bitacora");

const bitacoraAccion = require("./bitacoraAccion");

const General = require('../models/general')

//Get all Method
const generalesGet = async (req, res) => {
    try{
        const data = await General.find({ _id: req.params.generalId});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
        bitacora.log('error', "Fallo en la busqueda de la calificación del estudiante");
    }
}

const generalesPost = async (req, res = response) => {
    try{
        const { anio, periodo } = req.body;
    const general = new General( {anio, periodo } );

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
    const emailLoggedGlobal = global.email;
    try {
        await General.updateOne({ _id: req.params.generalId }, req.body);
        bitacoraAccion.log('debug', `${emailLoggedGlobal} actualizó datos del usuario con el siguiente correo: ${req.body.email}`);
        res.status(200).send({
            msg: 'PUT | CONTROLLER',
            id: req.params.idRes
        })
    } catch (err) {
        res.status(500).send(err);
        bitacora.log('error', "Fallo en la actualización de datos generales del sistema");
    }
}

const generalesDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE | CONTROLLER'
    })
}

const buscarGeneral = async (req, res) => {
    try{
        const anio = req.query.anio;
        const periodo = req.query.periodo;
        // const estudiante = req.params.correo;

        const data = await General.find(
            {
                "$and":[
                    {anio : anio},
                    {periodo : periodo}
                ]
            }
        );
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
        bitacora.log('error', "Fallo en la busqueda de datos generales del sistema");
    }
}



module.exports = {
    generalesGet,
    generalesPost,
    generalesPut,
    generalesDelete,
    buscarGeneral
}