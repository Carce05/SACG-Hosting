const { Schema, model } = require('mongoose');

const SeccionSchema = Schema({
    nombreSeccion : {
        type: String
    },
    fechaCrecion: {
        type: String
    }
});

module.exports = model( 'Secciones', SeccionSchema );