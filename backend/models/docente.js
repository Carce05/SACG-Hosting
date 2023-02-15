const { Schema, model } = require('mongoose');

const DocenteSchema = Schema({
    cedula: {
        type: String
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    correo_docente: {
        type: String
    }
});

module.exports = model( 'docentes', DocenteSchema );