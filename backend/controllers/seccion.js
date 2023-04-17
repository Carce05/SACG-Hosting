const { response } = require('express');
const Seccion = require('../models/seccion');

const seccionObtenerTodas = async (req, res) => {
    try{
        const data = await Seccion.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


const seccionAgregarNueva = async (req, res = response) => {
    const { nombreSeccion } = req.body;
    const revisarSeccion = await Seccion.findOne({ nombreSeccion });
    
    if(revisarSeccion) {
        res.json({
            msg: 'Sección actualmente en base de datos',
            revisarSeccion
        })
    } else {
        const seccion = new Seccion({
            ...req.body,
            fechaCrecion: new Date().toLocaleDateString()
        });
        await seccion.save();
    
        res.json({
            msg: 'Nueva Sección agregada',
            seccion
        })
    }

}

module.exports = {
    seccionAgregarNueva,
    seccionObtenerTodas
}