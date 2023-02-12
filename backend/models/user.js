const bcryptSalt = 10;
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String
    },
    thumb: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    personalId: {
        type: String
    },
    status: {
        type: String
    }
});



module.exports = model( 'Usuario', UsuarioSchema );