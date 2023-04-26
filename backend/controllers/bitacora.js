const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb');
const bitacora = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: 'error',
            db: 'mongodb+srv://LCDG:Lcdg123.@cluster0.pvrl9qx.mongodb.net/LDG?retryWrites=true&w=majority',
            options: {
                useUnifiedTopology: true
            },
            collection: 'bitacora',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = bitacora;

