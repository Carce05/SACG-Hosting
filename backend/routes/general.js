const { Router } = require('express');
const { check } = require('express-validator');
const { generalesGet, generalesPut, generalesPost } = require('../controllers/general');
const router = Router();

router.get('/:generalId', generalesGet)

router.put('/:generalId', generalesPut)

router.post('/', generalesPost)

module.exports = router;