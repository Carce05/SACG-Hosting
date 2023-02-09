const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config();

class Server {
    constructor() {
        this.app = express();
        this.port = 8080;

        //DB CONNECT
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use( cors());

        // PARSE JSON FORMAT
        this.app.use( express.json() );

        //SERVER STATIC FILE
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/user'))
        this.app.use('/api/reset-password', require('../routes/passwordReset'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${ this.port }`)
        })
    }
}

module.exports = Server;