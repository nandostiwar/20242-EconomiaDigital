
function ascendente(req, res) {
    const { body } = req;
    const { numeros } = body; 

    if (!numeros || !Array.isArray(numeros)) {
        return res.status(400).json({ error: 'Se requiere un array de números' });
    }

    const result = numeros.sort((a, b) => a - b);

    res.json({
        resultado: result
    });
}


function descendente(req, res) {
    const { body } = req;
    const { numeros } = body; 

    
    if (!numeros || !Array.isArray(numeros)) {
        return res.status(400).json({ error: 'Se requiere un array de números' });
    }

    const result = numeros.sort((a, b) => b - a);

    res.json({
        resultado: result
    });
}

function procesarEcuacion(req, res) {
    const { ecuacion, variables } = req.body; // La ecuación y las variables vienen del frontend
    
    if (!ecuacion || typeof ecuacion !== 'string') {
        return res.status(400).json({ error: 'Se requiere una ecuación válida' });
    }

    if (!variables || typeof variables !== 'object') {
        return res.status(400).json({ error: 'Se requiere un objeto de variables' });
    }

    try {
        let ecuacionProcesada = ecuacion;

        ecuacionProcesada = ecuacionProcesada.replace(/(\d)([A-Za-z])/g, '$1*$2');
        
        ecuacionProcesada = ecuacionProcesada.replace(/([A-Za-z])([A-Za-z])/g, '$1*$2');

        for (const [key, value] of Object.entries(variables)) {
            const regexVariable = new RegExp(key, 'g');
            ecuacionProcesada = ecuacionProcesada.replace(regexVariable, value);
        }

        const resultado = eval(ecuacionProcesada); // Evalúa la ecuación procesada con los valores numéricos

        res.json({
            resultado: resultado
        });

    } catch (error) {
        console.error("Error al procesar la ecuación:", error);
        res.status(400).json({ error: 'Error al procesar la ecuación' });
    }
}

module.exports = {
    ascendente,
    descendente,
    procesarEcuacion
}