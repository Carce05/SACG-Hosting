const { Router } = require('express');
const { check } = require('express-validator');
const { dmsGet, dmsPut, dmsPost, dmsDelete, DocenteAsignado } = require('../controllers/docentes_materias_secciones');
const router = Router();

router.get('/', dmsGet)

router.put('/:userId', dmsPut)

router.post('/',[
    check('correo', 'Email is not valid').isEmail()
], dmsPost)

router.delete('/', dmsDelete)
router.get('/DocenteAsignado/:docente', DocenteAsignado)

module.exports = router;