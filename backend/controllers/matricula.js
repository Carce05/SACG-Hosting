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

const matriculaModificarEstado = async (req, res) => {
    try {
        await Matricula.updateOne({ _id: req.params.matriculaEstudianteId }, {
            $set: {
                'estadoMatriculaAdmin': req.body.estadoMatriculaAdmin,
                'seccionMatriculaAdmin': req.body.seccion
            }
        });

        res.status(200).send({
            msg: 'TODO CORRECTO',
        })
    } catch (err) {
        res.status(500).send(err);
    }
}




module.exports = {
    matriculaPost,
    matriculaGet,
    matriculaModificarEstado
}