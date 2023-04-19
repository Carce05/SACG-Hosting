
const { Schema, model } = require('mongoose');

const GeneralSchema = Schema({
    anio: {
        type: Number
    },
    periodo: {
        type: String
    }
});

module.exports = model( 'General', GeneralSchema );