const { Router } = require('express');
const { check } = require('express-validator');
const { matriculaPost, matriculaGet, matriculaModificarEstado, matriculaRetornaFiltro, obtenerAnioMatricula } = require('../controllers/matricula');
const router = Router();

router.get('/', matriculaGet )

router.post('/obtenerAnioMatricula', obtenerAnioMatricula )

router.post('/matricular-filter', matriculaRetornaFiltro )

router.put('/matriculaModificarEstado/:matriculaEstudianteId', matriculaModificarEstado )

// router.put('/:userId', usuariosPut)

router.post('/',[
    check('nombreCompleto', 'Email is not valid').isEmail()
], matriculaPost)

// router.delete('/', usuariosDelete)
// router.get('/EstudiantesAsocidados/:correo', EstudiantesAsocidados)

module.exports = router;