const { Router } = require('express');
const { seccionObtenerTodas, seccionAgregarNueva } = require('../controllers/seccion');
const router = Router();

router.get('/', seccionObtenerTodas );
router.post('/', seccionAgregarNueva );

module.exports = router;