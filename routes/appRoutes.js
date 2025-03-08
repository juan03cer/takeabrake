const express = require('express')
const {vista} = require('../controllers/appControllers')

const router =express.Router();

router.get('Inicio',vista);

module.exports = router;