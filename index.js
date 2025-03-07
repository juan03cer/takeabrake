const express = require('express');
const jwt = require('jsonwebtoken');
const router = require('./routes/usuarioRoutes'); // Asegúrate de que routes/index.js exista y lo importe correctamente
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config({ path: 'variables.env' });
const conectarDB = require('./config/db');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const axios = require('axios');

// Conectar  MongoDB
conectarDB();

// Inicializar Express
const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json()); // ¡IMPORTANTE! Para que req.body funcione correctamente

// Middleware para autenticación con JWT
app.use((req, res, next) => {
    const token = req.headers['authorization'] || '';
    if (token) {
        try {
            const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
            req.usuario = usuario;
        } catch (error) {
            console.error('Error verificando el token:', error);
        }
    }
    next();
});

// Integrar rutas
app.use('/', router);

// Apollo Server para GraphQL
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ usuario: req.usuario })
});

// Iniciar Apollo Server con Express
async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    // Ruta para llamar a Python (Inteligencia Artificial)
    app.post('/api/predict', async (req, res) => {
        try {
            const response = await axios.post(`${process.env.PYTHON_API_URL}/predict`, { input: req.body.input });
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Error llamando a la IA en Python' });
        }
    });

    // Configurar puerto dinámico para Render
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Servidor REST en: http://localhost:${PORT}/`);
        console.log(`🚀 Servidor GraphQL en: http://localhost:${PORT}/graphql`);
    });
}

startApolloServer();
