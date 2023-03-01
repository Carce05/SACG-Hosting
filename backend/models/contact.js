const { Schema, model } = require('mongoose');

const ContactSchema = Schema({
    email: {
        type: String
    },
    phone: {
        type: String
    },
    location: {
        type: String
    }
});

module.exports = model( 'Contacto', ContactSchema );