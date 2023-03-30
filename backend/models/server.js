const express = require('express');
const cors = require('cors');
const path = require('path');
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
        this.app.options('*',cors());
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });

        // PARSE JSON FORMAT
        this.app.use( express.json() );

        //SERVER STATIC FILE
        this.app.use('/public', express.static('public'));
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/user'))
        this.app.use('/api/reset-password', require('../routes/passwordReset'))
        this.app.use('/api/estudiantes', require('../routes/estudiante'))
        this.app.use('/api/matricula', require('../routes/matriculas'))
        this.app.use('/api/docentes_materias_secciones', require('../routes/docente_materia_seccion'))
        this.app.use('/api/calificaciones', require('../routes/calificacion'))
        this.app.use('/api/contacto', require('../routes/contact'))
        this.app.use('/api/comunicados', require('../routes/announcement'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`APP RUNNING IN: ${ this.port }`)
        })
    }
}

module.exports = Server;