const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
require('dotenv').config({path: 'variables.env'})


//Crea y firma un jwt 
// const crearToken = (usuario,secreta,expiresIn) =>{
    const crearToken = (usuario,SECRETA) =>{
        const{id,email} = usuario;
         return jwt.sign({id,email}, SECRETA);
        // return jwt.sign({id,email}, SECRETA,{expiresIn});
    
    
    }

const resolvers= {
    Query: {
        obtenerMensaje: () => "¡GraphQL funcionando correctamente!"
    },
    Mutation:{
        crearUsuario: async (_,{input}) => {
            const {email,password} = input;
            const existeUsuario = await Usuario.findOne({email});
            console.log(existeUsuario)
            //si ele usuario existee
            if(existeUsuario){
                throw new Error('El usuario ya esta registrado');
            }

            try{
                // Hasheear password
                const salt= await bcryptjs.genSalt(10)
                input.password = await bcryptjs.hash(password, salt)
        

                // Registrar nuevo usuario
                const nuevoUsuario = new Usuario(input);
                // console.log(nuevoUsuario)

                await nuevoUsuario.save();
                return "Usuario Creado Correctamente";
            } catch(error){
                console.log(error);
            }
        },
        autenticarUsuario: async (_,{input}) =>{
            const{email,password} = input

            //Si el usuario existe
            const existeUsuario = await Usuario.findOne({email});
            //si el usuario existee
            if(!existeUsuario){
                throw new Error('El usuario no existe');
            }

            //Si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            
            if(!passwordCorrecto){
                throw new Error('Contraseña incorrecta');
            }

            //Dar acceso ala app

            return {
                token: crearToken(existeUsuario, process.env.SECRETA)
            }

        },
    }
}

module.exports = resolvers




