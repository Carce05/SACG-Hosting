const { response } = require('express');

const bcryptjs = require('bcryptjs')

const bitacora = require("../controllers/bitacora");
const DMS = require('../models/docente_materia_seccion');


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
    const {docente} = (req.query.docente).toString();
    const {materia} = (req.query.materia).toString();
    const {seccion} = (req.query.seccion).toString();
    const nuevo = new DMS( { docente, materia, seccion } );
    
    await nuevo.save();
 
    res.json({
        msg: 'POST | CONTROLLER',
        contact
    });
}

const dmsPut = async(req, res) => {
    try {
        await DMS.updateOne({_id: req.params.dmsId}, 
                                { $set: { docente: req.body.docente } });
        res.status(200).send({
            msg: 'PUT | CONTROLLER',
            id: req.params.dmsId
        })
    } catch (err) {
        res.status(500).send(err);
    }
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