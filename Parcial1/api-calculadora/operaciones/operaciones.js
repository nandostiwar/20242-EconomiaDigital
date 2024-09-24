/**
 * Sumar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function add(a, b) {
    let number1 = parseFloat(a);
    let number2 = parseFloat(b);
    return number1 + number2;
}

/**
 * Restar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function subtract(a, b) {
    let number1 = parseFloat(a);
    let number2 = parseFloat(b);
    return number1 - number2;
}

/**
 * Multiplicar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function multiply(a, b) {
    let number1 = parseFloat(a);
    let number2 = parseFloat(b);
    return number1 * number2;
}

/**
 * Ordenar un arreglo de números en orden ascendente
 * @param {Array} numeros 
 * @returns Array
 */
function ordenarAscendente(numeros) {
    return numeros.sort((a, b) => a - b);
}

/**
 * Ordenar un arreglo de números en orden descendente
 * @param {Array} numeros 
 * @returns Array
 */
function ordenarDescendente(numeros) {
    return numeros.sort((a, b) => b - a);
}

/**
 * Evaluar una ecuación
 * @param {string} ecuacion - La ecuación a evaluar en formato de cadena.
 * @returns {number} El resultado de la evaluación de la ecuación.
 */
function evaluarEcuacion(ecuacion) {
    const math = require('mathjs');

    // Verificar que la entrada sea una cadena
    if (typeof ecuacion !== 'string') {
        throw new Error("La entrada debe ser una cadena.");
    }

    // Evaluar la ecuación
    try {
        const resultado = math.evaluate(ecuacion);
        return resultado;
    } catch (error) {
        throw new Error("Error al evaluar la ecuación: " + error.message);
    }
}

module.exports = {
    add,
    subtract,
    multiply,
    ordenarAscendente,
    ordenarDescendente,
    evaluarEcuacion
};