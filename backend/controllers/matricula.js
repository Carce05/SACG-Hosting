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

const matriculaRetornaFiltro = async (req, res) => {
    try{
        const data = await Matricula.find();
        let matriculasFiltradas;
        if(req.body.anioMostrarInforme === "no-filtrar-anio" && req.body.estadoMostrarInforme === "no-filtrar-estado") {
            matriculasFiltradas = data;
        } else if (req.body.anioMostrarInforme === "no-filtrar-anio"){
            const filtroPorEstado = data.filter(item => {
                const year = new Date(item.fechaCreacionMatricula).getFullYear();
                return item.estadoMatriculaAdmin === req.body.estadoMostrarInforme;
                });
                matriculasFiltradas = filtroPorEstado;

        } else if (req.body.estadoMostrarInforme === "no-filtrar-estado") {
            const filtroPorAnio = data.filter(item => {
                const year = new Date(item.fechaCreacionMatricula).getFullYear();
                return year === parseInt(req.body.anioMostrarInforme);
              });
              matriculasFiltradas = filtroPorAnio;
        } else {
            const filtroPorAnio = data.filter(item => {
                const year = new Date(item.fechaCreacionMatricula).getFullYear();
                return year === parseInt(req.body.anioMostrarInforme);
            });
            const filtroPorEstado = filtroPorAnio.filter(item => {
                const year = new Date(item.fechaCreacionMatricula).getFullYear();
                return item.estadoMatriculaAdmin === req.body.estadoMostrarInforme;
                });
                matriculasFiltradas = filtroPorEstado;
        }
        res.json({
            cantidadMatriculasFiltradas: matriculasFiltradas.length,
            matriculasfiltradas: matriculasFiltradas,
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}




module.exports = {
    matriculaPost,
    matriculaGet,
    matriculaModificarEstado,
    matriculaRetornaFiltro
}