const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/calculadora.routes.js'); // Aquí asumo que ya tienes un archivo de rutas
const cors = require('cors');

const app = express();
const port = 3500;

// Middleware para parsear `application/x-www-form-urlencoded` y `application/json`
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Agregar las rutas existentes
app.use('/v1/calculadora', router);

// Ruta para ordenar números ascendentemente
app.post('/v1/calculadora/ascendente', (req, res) => {
    const { numbers } = req.body;

    if (!numbers || !Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Se requiere un array de números.' });
    }

    const sortedNumbers = numbers.sort((a, b) => a - b);
    res.json({ sortedNumbers });
});

// Ruta para ordenar números descendentemente
app.post('/v1/calculadora/descendente', (req, res) => {
    const { numbers } = req.body;

    if (!numbers || !Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Se requiere un array de números.' });
    }

    const sortedNumbers = numbers.sort((a, b) => b - a);
    res.json({ sortedNumbers });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
