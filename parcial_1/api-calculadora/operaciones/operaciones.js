
/**
 * Sumar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @param {Number} c 
 * @param {Number} d 
 * @returns Number
 */
function add(a, b, c, d){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    let number3 = parseInt(c);
    let number4 = parseInt(d);
    return number1 + number2 + number3 + number4;
}

function subtract(a, b, c, d){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    let number3 = parseInt(c);
    let number4 = parseInt(d);
    return number1 - number2 - number3 - number4;
}

function multiply(a, b, c, d){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    let number3 = parseInt(c);
    let number4 = parseInt(d);
    return number1 * number2 * number3 * number4;
}

function showd(a, b, c, d){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    let number3 = parseInt(c);
    let number4 = parseInt(d);

    const miArreglo = [number1, number2, number3, number4];
    miArreglo.sort(function(a, b){return b - a});

    return miArreglo;
}

function showa(a, b, c, d){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    let number3 = parseInt(c);
    let number4 = parseInt(d);

    const miArreglo = [number1, number2, number3, number4];
    miArreglo.sort();

    return miArreglo;
}

module.exports = {
    add,
    subtract,
    multiply,
    showa,
    showd
}