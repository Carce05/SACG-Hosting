const { response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/user')

const usuariosGet = async (req, res = response) => {

    try{
        const data = await Usuario.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const usuariosPost = async (req, res = response) => {
    const { name, thumb, role, email,password, personalId,status } = req.body;
    const usuario = new Usuario( { name, thumb, role, email,password, personalId, status } );
    
    //Check if the email exist
    const existEmail = await Usuario.findOne({ email });
    const existPersonalId = await Usuario.findOne({ personalId });
    if (existEmail ) {
        return res.status(400).json({
            msg: 'Email already taken'
        });
    }else if(existPersonalId){
        return res.status(400).json({
            msg: 'Personalid already taken'
        });
    }


    // Encrypt password
     const salt =  bcryptjs.genSaltSync();
     usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();
    // await usuarios.insertOne(usuario)

    res.json({
        msg: 'POST | CONTROLLER',
        usuario
    });
}

const usuariosPut = async(req, res) => {
    try {
        await Usuario.updateOne({ _id: req.params.userId }, req.body);
        res.status(200).send({
            msg: 'PUT | CONTROLLER',
            id: req.params.userId
        })
    } catch (err) {
        res.status(500).send(err);
    }
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE | CONTROLLER'
    })
}

const usuarioLogin = async (req, res = response) => {
    const { email, password  } = req.body;
    const { id, name, thumb, role, password : pass } = await Usuario.findOne({ email })

    if (password === pass) {
        res.json({
            status: true,
            usuario: {
                id,
                name,
                thumb,
                role,
                email
            }
        }) 
    } else {
        res.json({
            status: false,
            mgs: 'LOGIN INCORRECTO'
        })
    }

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuarioLogin
}