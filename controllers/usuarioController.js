const vista = (req, res) => {
    res.render('inicio', {
        pagina: 'Take a Brake',
        titulo: 'Bienvenido a Take a Brake'
    });
};

module.exports = { vista };
