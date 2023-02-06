const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuarioLogin } = require('../controllers/users');
const router = Router();

router.get('/', usuariosGet)

router.put('/:userId', usuariosPut)

router.post('/',[
    check('correo', 'Email is not valid').isEmail()
], usuariosPost)

router.delete('/', usuariosDelete)
router.post('/login', usuarioLogin)

module.exports = router;