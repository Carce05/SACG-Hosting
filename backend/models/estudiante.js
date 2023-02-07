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
    correo_encargado: {
        type: String
    }
});

module.exports = model( 'estudiantes', EstudianteSchema );