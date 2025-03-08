const express =require ('express');
const { formularioRegistro,registrar } = require( '../controllers/usuarioController');

const router = express.Router();


router.get('/registro',formularioRegistro)
router.post('/registro',registrar)

module.exports = router;