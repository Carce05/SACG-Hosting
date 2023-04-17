const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
    cedula: {
        type: String
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    nombreCompleto: {
        type: String
    },
    correo_encargado: {
        type: String
    },
    seccion: {
        type: String
    },
    id_matricula: {
        type: String
    }
});

module.exports = model( 'estudiantes', EstudianteSchema );