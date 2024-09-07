
/**
 * Sumar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function add(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 + number2;
}

function subtract(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 - number2;
}

function multiply(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 * number2;
}

function mayorNum(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    if (number1 > number2){
        return number1;
    }else{
        return number2;
    }
}

function menorNum(a, b){
    let number1 = parseInt(a+b);
    let number2 = parseInt(b);
    if (number1 < number2){
        return number1;
    }else{
        return number2;
    }
}

function promNum(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return (number1 + number2)/2;
}

module.exports = {
    add,
    subtract,
    multiply,
    mayorNum,
    menorNum,
    promNum
}