const { Router } = require('express');
const { check } = require('express-validator');
const { announcementPost, announcementGet, announcementDelete} = require('../controllers/announcement');
const router = Router();

router.post('/', announcementPost)
router.get('/', announcementGet)
router.delete('/:announcementId',announcementDelete)
module.exports = router;