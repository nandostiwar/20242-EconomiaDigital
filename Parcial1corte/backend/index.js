const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para ordenar números ascendente
app.post('/ordenar/ascendente', (req, res) => {
    const { numerosSeleccionados } = req.body; 
    if (!Array.isArray(numerosSeleccionados)) {
        return res.status(400).json({ error: 'numerosSeleccionados debe ser un array' });
    }
    const sortedNumbers = numerosSeleccionados.filter(num => !isNaN(num)).sort((a, b) => a - b);
    res.json({ sortedNumbers });
});

// Ruta para ordenar números descendente
app.post('/ordenar/descendente', (req, res) => {
    const { numerosSeleccionados } = req.body; 
    if (!Array.isArray(numerosSeleccionados)) {
        return res.status(400).json({ error: 'numerosSeleccionados debe ser un array' });
    }
    const sortedNumbers = numerosSeleccionados.filter(num => !isNaN(num)).sort((a, b) => b - a);
    res.json({ sortedNumbers });
});

// Ruta para calcular la ecuación
app.post('/calcular-ecuacion', (req, res) => {
    const { ecuacion, valores } = req.body;
    // Reemplazar las variables A, B, C, etc., por sus valores
    let resultado = ecuacion;
    for (const [letra, valor] of Object.entries(valores)) {
        // const regex = new RegExp(letra, 'g');
        const letra_min = letra.toLowerCase()
        resultado = resultado.replace(letra_min, valor);
    }

    // Usar eval (considera alternativas más seguras)
    try {
        const evalResult = eval(resultado); // evalúa la ecuación
        res.json({ resultado: evalResult });
    } catch (error) {
        res.status(400).json({ error: 'Ecuación no válida' });
    }
});

// Inicia el servidor en el puerto 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
