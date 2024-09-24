const math = require('algebrite'); //LIBRERIA

/**
 * Verifica si el valor es un número válido
 * @param {any} value
 * @returns {boolean}
 */
function isValidNumber(value) {
    return !isNaN(value) && isFinite(value);
}

/**
 * Sumar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns {Number}
 */
function add(a, b) {
    if (!isValidNumber(a) || !isValidNumber(b)) {
        throw new Error('Entrada no válida para la suma');
    }
    return parseFloat(a) + parseFloat(b);
}

/**
 * Restar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns {Number}
 */
function subtract(a, b) {
    if (!isValidNumber(a) || !isValidNumber(b)) {
        throw new Error('Entrada no válida para la resta');
    }
    return parseFloat(a) - parseFloat(b);
}

/**
 * Multiplicar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns {Number}
 */
function multiply(a, b) {
    if (!isValidNumber(a) || !isValidNumber(b)) {
        throw new Error('Entrada no válida para la multiplicación');
    }
    return parseFloat(a) * parseFloat(b);
}

/**
 * Dividir dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns {Number}
 */
function divide(a, b) {
    if (!isValidNumber(a) || !isValidNumber(b)) {
        throw new Error('Entrada no válida para la división');
    }
    if (parseFloat(b) === 0) {
        throw new Error('División por cero no permitida');
    }
    return parseFloat(a) / parseFloat(b);
}

/**
 * Ordenar un arreglo de números en orden ascendente
 * @param {Array} numeros 
 * @returns Array
 */
function ordenarAscendente(numeros) {
    if (!Array.isArray(numeros) || numeros.some(num => !isValidNumber(num))) {
        throw new Error('Entrada no válida. Debe ser un arreglo de números.');
    }
    return numeros.sort((a, b) => a - b);
}

/**
 * Ordenar un arreglo de números en orden descendente
 * @param {Array} numeros 
 * @returns Array
 */
function ordenarDescendente(numeros) {
    if (!Array.isArray(numeros) || numeros.some(num => !isValidNumber(num))) {
        throw new Error('Entrada no válida. Debe ser un arreglo de números.');
    }
    return numeros.sort((a, b) => b - a);
}

function procesarEcuacion(req, res) {
    const { equation, variables } = req.body;

    try {
        // Validar que la ecuación no esté vacía y sea de tipo string
        if (!equation || typeof equation !== 'string') {
            return res.status(400).json({ error: 'La ecuación es inválida o está vacía.' });
        }

        let evaluada = equation;

        // Paso 1: Agregar multiplicación explícita entre números y variables (ejemplo: 2B -> 2 * B)
        // Esta expresión regular asegura que siempre haya un * entre un número y una variable.
        evaluada = evaluada.replace(/(\d+)([a-zA-Z]+)/g, '$1 * $2');

        // Paso 2: Reemplazar las variables con sus valores correspondientes
        for (const [key, value] of Object.entries(variables)) {
            if (!isValidNumber(value)) {
                throw new Error(`La variable ${key} debe ser un número válido.`);
            }
            // Reemplaza las variables con sus valores en la ecuación
            evaluada = evaluada.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
        }

        // Evaluar la ecuación usando Algebrite
        const resultado = math.eval(evaluada);
        res.json({ resultado });
    } catch (error) {
        console.error('Error al procesar la ecuación:', error);
        res.status(500).json({ error: 'Error al procesar la ecuación' });
    }
}




// Exportar las funciones
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    ordenarAscendente,
    ordenarDescendente,
    procesarEcuacion
};
