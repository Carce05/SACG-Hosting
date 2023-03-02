const { Router } = require('express');
const { check } = require('express-validator');
const { contactGet, contactPost, contactPut } = require('../controllers/contact');
const router = Router();

router.get('/:contactId', contactGet)

router.post('/', contactPost)

router.put('/:contactId', contactPut)
module.exports = router;