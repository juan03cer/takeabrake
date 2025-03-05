const { gql } = require ('apollo-server');

const typeDefs = gql `

    type Token {
    token:String
    }
    type Query {
    obtenerMensaje: String

    }
    input UsuarioInput{
        nombre:String!
        email:String!
        password:String!
    }
    
    input AutenticarInput{
        email:String
        password:String
    }
    
    type Mutation {
    
        #Usuarios
        crearUsuario(input: UsuarioInput) : String
        autenticarUsuario(input: AutenticarInput) : Token

    }
`;

module.exports = typeDefs;