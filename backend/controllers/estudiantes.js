const { response } = require('express');

const bcryptjs = require('bcryptjs')

const Estudiante = require('../models/estudiante')

//Get all Method
const estudiantesGet = (req, res) => {
    Estudiante.find({},(err,answer) => {
        if(err){res.send(err)}
        else{
            res.send(answer)
        }
    })
}

const usuariosPost = async (req, res = response) => {
    const { name, thumb, role, email,password } = req.body;
    const usuario = new Usuario( { name, thumb, role, email,password } );


    //Check if the email exist
    const existEmail = await Usuario.findOne({ email })

    if (existEmail) {
        return res.status(400).json({
            msg: 'Email already taken'
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

const EstudiantesAsocidados = async (res = response) => {
    //const { email, password  } = req.body;
    const correo = 'mau@gmail.com';
    const { cedula, nombre, apellido, correo : correo_encargado } = await Estudiante.findOne({ correo_encargado })

        res.json({
            status: true,
            estudiante: {
                cedula,
                nombre,
                apellido,
                correo_encargado
            }
        }) 

}



module.exports = {
    estudiantesGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    EstudiantesAsocidados
}