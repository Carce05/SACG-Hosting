const { Router } = require('express');
const { check } = require('express-validator');
const { generalesGet, generalesPut, generalesPost, generalesDelete, buscarGeneral } = require('../controllers/general');
const router = Router();

router.get('/generalId', generalesGet)

router.put('/:idRes', generalesPut)

router.post('/', generalesPost)

router.delete('/', generalesDelete)

router.get('/buscarCalificacion', buscarGeneral)

module.exports = router;