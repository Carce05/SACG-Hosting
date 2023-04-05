const { Router } = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const { usuariosGet, usuariosPut, usuariosPost,usuariosPostImage, usuariosDelete, usuarioLogin, userImageUpload } = require('../controllers/users');
const router = Router();

//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: "./public/images/profile_upload",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname.toLowerCase().replaceAll(' ', '')}`);
    },
});

//initializing multer
const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 100000000000000 },
});


router.get('/', usuariosGet)

router.put('/:userId', usuariosPut)

router.post('/userimage', upload.single("image"), userImageUpload)

router.post('/',[
    check('correo', 'Email is not valid').isEmail()
], usuariosPost)

router.post('/withimage', upload.single("image"), usuariosPostImage)


router.delete('/', usuariosDelete)
router.post('/login', usuarioLogin)

module.exports = router;