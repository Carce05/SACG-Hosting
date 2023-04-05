const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb');
const bitacoraAccion = createLogger({
    transports: [
        new transports.File({
            filename: 'accion.log',
            level: 'debug',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: 'debug',
            db: 'mongodb+srv://LCDG:Lcdg123.@cluster0.pvrl9qx.mongodb.net/LDG?retryWrites=true&w=majority',
            options: {
                useUnifiedTopology: true
            },
            collection: 'bitacoraAccion',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = bitacoraAccion;

