const { Schema, model } = require('mongoose');

const AnnouncementSchema = Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: String
    }
});

module.exports = model( 'Announcement', AnnouncementSchema );