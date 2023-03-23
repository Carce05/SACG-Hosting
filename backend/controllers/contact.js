const { response } = require('express');
const Contact = require('../models/contact')

//Get all Method
const contactGet = async (req, res) => {
    try{
        const data = await Contact.find({ _id: req.params.contactId });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const contactPost = async (req, res = response) => {
    const { email, phone, location} = req.body;
    const contact = new Contact( { email, phone, location } );
    
    await contact.save();

    res.json({
        msg: 'POST | CONTROLLER',
        contact
    });
}

const contactPut = async(req, res) => {
    try {
        await Contact.updateOne({ _id: req.params.contactId }, req.body);
        res.status(200).send({
            msg: 'PUT | CONTROLLER',
            id: req.params.contactId
        })
    } catch (err) {
        res.status(500).send(err);
    }
}
module.exports = {
    contactGet,
    contactPost,
    contactPut
}