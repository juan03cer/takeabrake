const Usuario = require('../models/Usuario')

const vista = (req, res) => {
    res.render('inicio', {
        pagina: 'Take a Brake',
        
    });
};

module.exports = { 
    vista
};
