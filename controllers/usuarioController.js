const Usuario = require('../models/Usuario')



const formularioRegistro = (req,res) => {
    res.render('auth/registro',{
        pagina:'Iniciar Sesion'
    })
}
const registrar = async (req,res) => {
  const usuario = new Usuario(req.body);
  try{
    await usuario.save();
    res.json({mensaje:'se agrego un nuevo cliente'})
  }catch(error){
    console.log(error)
  }
         
}

module.exports = { 
  
    formularioRegistro,
    registrar
};
