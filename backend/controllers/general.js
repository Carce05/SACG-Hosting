const { response } = require('express');

const bcryptjs = require('bcryptjs')

const bitacora = require("../controllers/bitacora");

const General = require('../models/general')

//Get all Method
const generalesGet = async (req, res) => {
    try{
        const data = await General.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
        bitacora.log('error', "Fallo en la busqueda de la calificación del estudiante");
    }
}

const generalesPost = async (req, res) => {
    const { anio, periodo } = req.body;
    const general = new General( {anio, periodo } );


    //Check if the email exist
    // const existEmail = await General.findOne({ email })

    /*
    if (existEmail) {
        return res.status(400).json({
            msg: 'Email already taken'
        })
    }
    */

    // Encrypt password
    // const salt =  bcryptjs.genSaltSync();
    // usuario.password = bcryptjs.hashSync(password, salt)

    await general.save();
    // await usuarios.insertOne(usuario)

    res.json({
        msg: 'POST | CONTROLLER',
        general
    })
}

const generalesPut = async(req, res) => {
    try {
        await General.updateOne({ _id: req.params.idRes }, req.body);
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