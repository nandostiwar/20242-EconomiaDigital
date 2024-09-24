const math = require('mathjs'); 
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

/**
 * Procesar y evaluar una ecuación de forma segura
 * @param {Object} req
 * @param {Object} res
 */
function procesarEcuacion(req, res) {
    const { equation, variables } = req.body;

    try {
        // Reemplazar las variables en la ecuación
        let evaluada = equation;
        for (const [key, value] of Object.entries(variables)) {
            if (!isValidNumber(value)) {
                throw new Error(`La variable ${key} debe ser un número.`);
            }
            evaluada = evaluada.replace(new RegExp(key, 'g'), value);
        }

        // Evaluar la ecuación de manera segura usando mathjs
        const resultado = math.evaluate(evaluada);
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
