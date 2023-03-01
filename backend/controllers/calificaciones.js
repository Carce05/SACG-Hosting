const { response } = require('express');

const bcryptjs = require('bcryptjs')

const Calificacion = require('../models/calificacion')

//Get all Method
const calificacionesGet = async (req, res) => {
    try{
        const data = await Calificacion.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const calificacionesPost = async (req, res = response) => {
    const { cotidiano, tarea,  examen1, examen2, proyecto, asistencia, observaciones } = req.body;
    const calificacion = new Calificacion( { cotidiano, tarea,  examen1, examen2, proyecto, asistencia, observaciones } );


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

const calificacionesPut = (req, res = response) => {

    const id = req.params.userId;
    res.json({
        msg: 'PUT | CONTROLLER',
        id
    })
}

const calificacionesDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE | CONTROLLER'
    })
}

/*
const EstudiantesAsocidados = async (req, res) => {
    try{
        const correo = req.params.correo;
        const data = await Estudiante.find(
            {
                "$or":[
                    {correo_encargado : correo}
                ]
            }
        );
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
*/



module.exports = {
    calificacionesGet,
    calificacionesPost,
    calificacionesPut,
    calificacionesDelete
}