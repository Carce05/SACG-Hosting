const { Router } = require('express');
const { check } = require('express-validator');
const { calificacionesGet, calificacionesPut, calificacionesPost, calificacionesDelete, buscarCalificacion } = require('../controllers/calificaciones');
const router = Router();

router.get('/', calificacionesGet)

router.put('/:idRes', calificacionesPut)

router.post('/', calificacionesPost)

router.delete('/', calificacionesDelete)

router.get('/buscarCalificacion', buscarCalificacion)

module.exports = router;