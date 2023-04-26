const { response } = require('express');
const Announcement = require('../models/announcement')
const bitacoraAccion = require("./bitacoraAccion");

const announcementPost = async (req, res = response) => {
    try {
        const { title, description } = req.body;
        const announcement = new Announcement({ title, description, createdAt: new Date()});
        await announcement.save();
        const emailLoggedGlobal = global.email;
        bitacoraAccion.log('debug', `El usuario ${emailLoggedGlobal}, creó un nuevo aviso bajo el titulo de ${req.body.title}`);
        res.json({
            msg: 'POST | CONTROLLER',
            announcement
        })
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const announcementGet = async (req, res = response) => {

    try{
        const data = await Announcement.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const announcementDelete = async (req, res) => {
    try {
        const avisoEliminado = req.params.announcementId;
        await Announcement.findByIdAndDelete({ _id: req.params.announcementId }, req.body);
        const emailLoggedGlobal = global.email;
        bitacoraAccion.log('debug', `El usuario ${emailLoggedGlobal}, eliminó un aviso bajo el ID de ${avisoEliminado}`);
        res.status(200).send({
            msg: 'Eliminado con exito '
        });
    }
    catch (err) {
        bitacora.log('error', "Fallo al eliminar el aviso")
        res.status(500).send(err);
        
        
    }
}
module.exports = {
    announcementGet,
    announcementPost,
    // announcementPut,
    announcementDelete
}