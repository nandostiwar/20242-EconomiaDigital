function fascendente(req, res) {
    const { body } = req;

    // Accede a numbers directamente desde el body
    const numbersArray = body.numbers; // Esto ahora debe ser un array

    console.log("Valores recibidos:", numbersArray);

    // Asegúrate de que los números son convertidos y filtrados correctamente
    const sortedNumbers = numbersArray
        .map(num => parseFloat(num))   // Convierte a número
        .filter(num => !isNaN(num) && num !== 0)  // Filtra valores no numéricos y vacíos
        .sort((a, b) => a - b);          // Ordena en forma ascendente

    // Mostrar el resultado ordenado en la consola
    console.log("Ordenados:", sortedNumbers);

    // Enviar el resultado como JSON
    res.json({ sortedNumbers });
}

function fdescendente(req, res) {
    const { body } = req;

    // Accede a numbers directamente desde el body
    const numbersArray = body.numbers; // Esto ahora debe ser un array

    console.log("Valores recibidos:", numbersArray);

    // Asegúrate de que los números son convertidos y filtrados correctamente
    const sortedNumbers = numbersArray
        .map(num => parseFloat(num))   // Convierte a número
        .filter(num => !isNaN(num) && num !== 0)  // Filtra valores no numéricos y vacíos
        .sort((a, b) => b- a);          // Ordena en forma ascendente

    // Mostrar el resultado ordenado en la consola
    console.log("Ordenados:", sortedNumbers);

    // Enviar el resultado como JSON
    res.json({ sortedNumbers });
}

  function evaluarEcuacion (req, res)  {
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
};



module.exports = {
    fascendente,
    fdescendente,
    evaluarEcuacion
}