const { Router } = require('express');
const { check } = require('express-validator');
const { docentesGet, docentesPut, docentesPost, docentesDelete, DocentesAsocidados } = require('../controllers/docentes');
const router = Router();

router.get('/', docentesGet)

router.put('/:userId', docentesPut)

router.post('/',[
    check('correo', 'Email is not valid').isEmail()
], docentesPost)

router.delete('/', docentesDelete)
router.get('/DocentesAsocidados/:correo', DocentesAsocidados)

module.exports = router;