const express = require('express');
const app = express();
const port = 3500;

app.use(express.json()); // Middleware para parsear JSON

// Ruta para ordenar los números de manera ascendente
app.post('/v1/calculadora/ascendente', (req, res) => {
    const { numbers } = req.body;  // Recibimos los números del frontend
    if (!numbers || !Array.isArray(numbers)) {
        return res.status(400).json({ error: 'No se enviaron números válidos' });
    }

    const sortedNumbers = numbers.sort((a, b) => a - b);  // Orden ascendente
    res.json({ sortedNumbers });
});

// Ruta para ordenar los números de manera descendente
app.post('/v1/calculadora/descendente', (req, res) => {
    const { numbers } = req.body;  // Recibimos los números del frontend
    if (!numbers || !Array.isArray(numbers)) {
        return res.status(400).json({ error: 'No se enviaron números válidos' });
    }

    const sortedNumbers = numbers.sort((a, b) => b - a);  // Orden descendente
    res.json({ sortedNumbers });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
