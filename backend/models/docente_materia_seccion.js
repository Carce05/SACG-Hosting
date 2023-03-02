const { Schema, model } = require('mongoose');

const DocenteMateriaSeccionSchema = Schema({
    docente: {
        type: String
    },
    materia: {
        type: String
    },
    seccion: {
        type: String
    }
});

module.exports = model( 'docentes_materias_secciones', DocenteMateriaSeccionSchema );