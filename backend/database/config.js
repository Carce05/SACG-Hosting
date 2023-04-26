const mongoose = require("mongoose");
const uri = 'mongodb+srv://LCDG:Lcdg123.@cluster0.pvrl9qx.mongodb.net/LDG?retryWrites=true&w=majority';

const dbConnection = async () => {

    try {
       mongoose.set('strictQuery', true);
       await mongoose.connect( uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       })
       console.log('BASE DE DATOS CONECTADA')

    } catch (err) {
        console.log(err)
        throw new Error('DB ERROR CONNECTION');
    }
}



module.exports = {
    dbConnection
}
