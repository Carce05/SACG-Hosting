const { response } = require('express');

const bcryptjs = require('bcryptjs')

const bitacora = require("../controllers/bitacora");
const DMS = require('../models/docente_materia_seccion')

//Get all Method
const dmsGet = async (req, res) => {
    try{
        const data = await DMS.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const dmsPost = async (req, res = response) => {
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

const dmsPut = (req, res = response) => {

    const id = req.params.userId;
    res.json({
        msg: 'PUT | CONTROLLER',
        id
    })
}

const dmsDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE | CONTROLLER'
    })
}

const DocenteAsignado = async (req, res) => {
    try{
        const docente = req.params.docente;
        const data = await DMS.find(
            {
                "$or":[
                    {docente : docente}
                ]
            }
        );
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}




module.exports = {
    dmsGet,
    dmsPost,
    dmsPut,
    dmsDelete,
    DocenteAsignado
}