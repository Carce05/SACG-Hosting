const { response } = require('express');
const Announcement = require('../models/announcement')
const bitacora = require("../controllers/bitacora");

const announcementPost = async (req, res = response) => {
    try {
        const { title, description } = req.body;
        const announcement = new Announcement({ title, description, createdAt: new Date().toLocaleDateString() });
        await announcement.save();
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
        await Announcement.findByIdAndDelete({ _id: req.params.announcementId }, req.body);
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