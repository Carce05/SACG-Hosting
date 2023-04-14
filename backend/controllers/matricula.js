const { response } = require('express');
const Matricula = require('../models/matricula');
const Estudiante = require('../models/estudiante')

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
    const { cedula, estadoMatriculaAdmin, seccion, nombreCompleto, correo_encargado } = req.body;
    try {
        if (estadoMatriculaAdmin === "Aprobado") {
            const estudianteObtenido = await Estudiante.findOne({ cedula });
            if (estudianteObtenido) {
                const {_id: id} = estudianteObtenido
                await Estudiante.updateOne({ _id: id }, {
                    $set: {
                        "seccion": seccion
                    }
                });
                res.status(200).send(estudianteObtenido);
            } else {
                const estudiante = new Estudiante( {
                    "nombreCompleto": nombreCompleto,
                    "cedula": cedula,
                    "correo_encargado": correo_encargado,
                    "seccion": seccion,
                    "id_matricula": req.params.matriculaEstudianteId
                });
                await estudiante.save();
                res.status(200).send('NO ENCONTRADO | SE GUARDO UNO NUEVO ');
            }
        } else {
            res.status(200).send('SE HA MODIFICADO LA MATRICULA');
        }
        await Matricula.updateOne({ _id: req.params.matriculaEstudianteId }, {
            $set: {
                'estadoMatriculaAdmin': estadoMatriculaAdmin,
                'seccionMatriculaAdmin': seccion
            }
        });
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