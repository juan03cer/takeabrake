const express =require ('express');
const { vista } = require( '../controllers/usuarioController');

const router = express.Router();

router.get('/',vista)

module.exports = router;