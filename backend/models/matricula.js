const { Schema, model } = require('mongoose');

const MatriculaSchema = Schema({
    encargadoCorreo : {
        type: String
    },
    encargadoId : {
        type: String
    },
    encargadoLegal : {
        type: String
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    fechaNacimiento: {
        type: String
    },
    edadCumplidaAnios: {
        type: Number
    },
    edadCumplidaMeses: {
        type: Number
    },
    nacionalidad: {
        type: String
    },
    telefono: {
        type: Number
    },
    domicilio: {
        type: String
    },
    centroEducativoProcedencia: {
        type: String
    },
    nivelAnterior: {
        type: Number
    },
    matricularNivelDe: {
        type: Number
    },
    estudianteConviveCon: {
        type: String,
        enum: ['Ambos Padres', 'Solo con la madre', 'Solo con el padre', 'Mamá y padrastro', 'Papá y madrastra', 'Otro']
    },
    estudianteConviveConOtros: {
        type: String
    },
    tieneAdecuancion: {
        type: String
    },
    cualAdecuancion: {
        type: String
    },
    razonesEntrar: {
        type: String
    },
    estadoMatriculaAdmin: {
        type: String
    },
    seccionMatriculaAdmin: {
        type: String
    },
    fechaCreacionMatricula: {
        type: String
    },
    cedulaEstudiante: {
        type: String
    },
});

module.exports = model( 'Matriculas', MatriculaSchema );