const { Router } = require('express');
const { check } = require('express-validator');
const { matriculaPost, matriculaGet } = require('../controllers/matricula');
const router = Router();

router.get('/', matriculaGet )

// router.put('/:userId', usuariosPut)

router.post('/',[
    check('nombreCompleto', 'Email is not valid').isEmail()
], matriculaPost)

// router.delete('/', usuariosDelete)
// router.get('/EstudiantesAsocidados/:correo', EstudiantesAsocidados)

module.exports = router;