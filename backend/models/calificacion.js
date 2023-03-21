const { number } = require('joi');
const { Schema, model } = require('mongoose');

const CalificacionSchema = Schema({
    estudiante: {
        type: String
    },
    materia: {
        type: String
    },
    cotidiano: {
        type: Number
    },
    tarea: {
        type: Number
    },
    examen1: {
        type: Number
    },
    examen2: {
        type: Number
    },
    proyecto: {
        type: Number
    },
    asistencia: {
        type: Number
    },
    total: {
        type: Number
    },
    observaciones: {
        type: String
    },
    anio: {
        type: Number
    },
    trimestre: {
        type: String
    },
});

module.exports = model( 'calificaciones', CalificacionSchema );