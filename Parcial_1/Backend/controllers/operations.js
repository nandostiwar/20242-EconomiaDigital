//const math = require('mathjs'); 
const math = require('algebrite');

/**
 * @param {Number} a 
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} e
 * @param {Number} f
 * @returns Numbers
 */

function Suma(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    let number3 = parseInt(c);
    let number4 = parseInt(d);
    let number5 = parseInt(e);
    let number6 = parseInt(f);
    return number1 + number2 + number3 + number4 + number5 + number6;
}

function Resta(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    let number3 = parseInt(c);
    let number4 = parseInt(d);
    let number5 = parseInt(e);
    let number6 = parseInt(f);
    return number1 - number2 - number3 - number4 - number5 - number6;
}

function multiplicacion(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    let number3 = parseInt(c);
    let number4 = parseInt(d);
    let number5 = parseInt(e);
    let number6 = parseInt(f);
    return number1 * number2 * number3 * number4 * number5 * number6;
}

function Division(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 / number2;
}


module.exports = {
    Suma,
    Resta,
    multiplicacion,
    Division
}