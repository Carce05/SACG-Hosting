const { Router } = require('express');
const { check } = require('express-validator');
const { calificacionesGet, calificacionesPut, calificacionesPost, calificacionesDelete } = require('../controllers/calificaciones');
const router = Router();

router.get('/', calificacionesGet)

router.put('/:userId', calificacionesPut)

router.post('/',[
    check('correo', 'Email is not valid').isEmail()
], calificacionesPost)

router.delete('/', calificacionesDelete)

module.exports = router;