const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = 'mongodb+srv://LCDG:Lcdg123.@cluster0.pvrl9qx.mongodb.net/?retryWrites=true&w=majority'


async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Conectado a MongoDB");

    }catch (error){
        console.error(error);
    }
}

connect();

app.listen(8000, () => {
        console.log("El servidor inicio en el puerto 8000")
});

