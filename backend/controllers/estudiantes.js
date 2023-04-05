const { response } = require('express');

const bcryptjs = require('bcryptjs')
const bitacora = require("../controllers/bitacora");
const Estudiante = require('../models/estudiante')

//Get all Method
const estudiantesGet = async (req, res) => {
    try{
        const data = await Estudiante.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const usuariosPost = async (req, res = response) => {
    const { name, thumb, role, email,password } = req.body;
    const usuario = new Usuario( { name, thumb, role, email,password } );


    //Check if the email exist
    const existEmail = await Usuario.findOne({ email })

    if (existEmail) {
        return res.status(400).json({
            
            msg: 'Ya existe un usuario este email'
            
            
        })
    }

    // Encrypt password
    // const salt =  bcryptjs.genSaltSync();
    // usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();
    // await usuarios.insertOne(usuario)

    res.json({
        msg: 'POST | CONTROLLER',
        usuario
    })
}

const usuariosPut = (req, res = response) => {

    const id = req.params.userId;
    res.json({
        msg: 'PUT | CONTROLLER',
        id
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE | CONTROLLER'
    })
}

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
        bitacora.log('error', "El encargado legal no tiene estudiantes asignados")
        res.status(500).json({message: error.message})
    }
}




module.exports = {
    estudiantesGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    EstudiantesAsocidados
}