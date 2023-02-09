const { Router } = require('express');
const { check } = require('express-validator');
const { estudiantesGet, usuariosPut, usuariosPost, usuariosDelete, EstudiantesAsocidados } = require('../controllers/estudiantes');
const router = Router();

router.get('/', estudiantesGet)

router.put('/:userId', usuariosPut)

router.post('/',[
    check('correo', 'Email is not valid').isEmail()
], usuariosPost)

router.delete('/', usuariosDelete)
router.get('/EstudiantesAsocidados/:correo', EstudiantesAsocidados)

module.exports = router;