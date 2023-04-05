const { response } = require('express');

const bcryptjs = require('bcryptjs')

const bitacora = require("../controllers/bitacora");

const Calificacion = require('../models/calificacion')

//Get all Method
const calificacionesGet = async (req, res) => {
    try{
        const data = await Calificacion.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
        bitacora.log('error', "Fallo en la busqueda de la calificación del estudiante");
    }
}

const calificacionesPost = async (req, res) => {
    const { estudiante, materia, cotidiano, tarea,  examen1, examen2, proyecto, asistencia, observaciones, anio, trimestre } = req.body;
    const calificacion = new Calificacion( { estudiante, materia, cotidiano, tarea,  examen1, examen2, proyecto, asistencia, observaciones, anio, trimestre } );


    //Check if the email exist
    // const existEmail = await Calificacion.findOne({ email })

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

    await calificacion.save();
    // await usuarios.insertOne(usuario)

    res.json({
        msg: 'POST | CONTROLLER',
        calificacion
    })
}

const calificacionesPut = async(req, res) => {
    try {
        await Calificacion.updateOne({ _id: req.params.idRes }, req.body);
        res.status(200).send({
            msg: 'PUT | CONTROLLER',
            id: req.params.idRes
        })
    } catch (err) {
        res.status(500).send(err);
        bitacora.log('error', "Fallo en la actualización de calificación del estudiante");
    }
}

const calificacionesDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE | CONTROLLER'
    })
}

const buscarCalificacion = async (req, res) => {
    try{
        const estudiante = req.query.estudiante;
        const materia = req.query.materia;
        // const estudiante = req.params.correo;

        const data = await Calificacion.find(
            {
                "$and":[
                    {estudiante : estudiante},
                    {materia : materia}
                ]
            }
        );
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
        bitacora.log('error', "Fallo en la busqueda de la calificación del estudiante");
    }
}



module.exports = {
    calificacionesGet,
    calificacionesPost,
    calificacionesPut,
    calificacionesDelete,
    buscarCalificacion
}