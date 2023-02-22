const { response } = require('express');
const Matricula = require('../models/matricula');

const matriculaGet = async (req, res) => {
    try{
        const data = await Matricula.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


const matriculaPost = async (req, res = response) => {
    const matricula = new Matricula( req.body );
    await matricula.save();

    res.json({
        msg: 'POST | CONTROLLER',
        matricula
    })
}




module.exports = {
    matriculaPost,
    matriculaGet
}