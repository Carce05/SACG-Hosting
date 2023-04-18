const { response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/user')
const bitacora = require("./bitacora");
const bitacoraAccion = require("./bitacoraAccion");


const usuariosGet = async (req, res = response) => {

    try {
        const data = await Usuario.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const usuariosPost = async (req, res = response) => {
    const { name, role, email, password, personalId, status } = req.body;
    const usuario = new Usuario({ name, thumb: '', role, email, password, personalId, status });
    //Check if the email exist
    const existEmail = await Usuario.findOne({ email });
    const existPersonalId = await Usuario.findOne({ personalId });
    if (existEmail) {
        return res.status(400).json({
            msg: 'Email already taken'
        });
    }
    if (existPersonalId) {
        return res.status(400).json({
            msg: 'Personalid already taken'
        });
    }
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)
    await usuario.save();
    const emailLoggedGlobal = global.email;
     bitacoraAccion.log('debug', `${emailLoggedGlobal} creó un nuevo usuario con el siguiente correo: ${req.body.email}`);
    res.json({
        msg: 'POST | CONTROLLER',
        usuario
    });
}
const usuariosPostImage = async (req, res = response) => {
    const { name, role, email, password, personalId, status } = req.body;
    const usuario = new Usuario({ name, thumb: `https://sacg-test.onrender.com/${req.file.path}`, role, email, password, personalId, status });
    //Check if the email exist
    const existEmail = await Usuario.findOne({ email });
    const existPersonalId = await Usuario.findOne({ personalId });
    if (existEmail) {
        return res.status(400).json({
            msg: 'Email already taken'
        });
    }
    if (existPersonalId) {
        return res.status(400).json({
            msg: 'Personalid already taken'
        });
    }
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)
    await usuario.save();
    res.json({
        msg: 'POST | CONTROLLER',
        usuario
    });
}

const usuariosPut = async (req, res) => {
    const currentUserReq = await Usuario.findOne({ _id: req.params.userId })
    const emailLoggedGlobal = global.email;
    try {
        if (currentUserReq.password !== req.body.password) {
            const bcryptPass = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync())
            await Usuario.updateOne({ _id: req.params.userId }, { ...req.body, password: bcryptPass });
            console.log('ojo aqui global',emailLoggedGlobal);
            bitacoraAccion.log('debug', `${emailLoggedGlobal} actualizó datos del usuario con el siguiente correo: ${req.body.email}`);
        } else {
            await Usuario.updateOne({ _id: req.params.userId }, req.body);
            console.log('ojo aqui global',emailLoggedGlobal);
            bitacoraAccion.log('debug', `${emailLoggedGlobal} actualizó datos del usuario con el siguiente correo: ${req.body.email}`);
        }
        res.status(200).send({
            msg: 'PUT | CONTROLLER',
            id: req.params.userId
        })
    } catch (err) {
        // res.status(500).send(err);
    }
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE | CONTROLLER'
    })
}

const usuarioLogin = async (req, res = response) => {
    
    const { email, password } = req.body;
     global.email = email;
    const usuarioObtenido = await Usuario.findOne({ email });
    
    if (usuarioObtenido) {
        const { id, name, thumb, role, password: pass, personalId } = usuarioObtenido;
        console.log(personalId)
        const validate = await bcryptjs.compare(password, pass);
        if (validate) {
            
            res.json({
                status: true,
                usuario: {
                    id,
                    name,
                    thumb,
                    role,
                    email,
                    pass,
                    personalId
                }
            })
        } else {
            res.json({
                status: false,
                mgs: 'LOGIN INCORRECTO'

            })
            bitacora.log('error', "Error al intentar loguearse al sistema");
        }
    } else {
        res.json({
            status: false,
            mgs: 'USUARIO NO ENCONTRADO'

        })
        bitacora.log('error', "Error al intentar loguearse al sistema");
    }
}


const userImageUpload = async (req, res = response) => {

    if (req.body.updateImage) {
        try {
            await Usuario.updateOne({ _id: req.body.userId }, {
                $set: {
                    'thumb': `https://sacg-test.onrender.com/${req.file.path}`
                }
            });

            res.status(200).send({
                msg: 'IMAGEN ACTUALIZADA CORRECTAMENTE',
                id: req.body.userId,
                imagePath: `https://sacg-test.onrender.com/${req.file.path}`
            })
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuarioLogin,
    userImageUpload,
    usuariosPostImage
}
