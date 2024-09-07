
const {add, subtract, multiply, mayorNum, menorNum, promNum} = require('../operaciones/operaciones.js');

function sumar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = add(number1, number2);
    console.log("num1: " + String(number1) + " num2: " + String(number2) + " y la suma: " + String(result))
    res.json({
        resultado: result
    });
}

function restar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = subtract(number1, number2);
    res.json({
        resultado: result
    })
}

function multiplicar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = multiply(number1, number2);
    res.json({
        resultado: result
    })
}

function calculeMayor(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = mayorNum(number1, number2);
    res.json({
        resultado: result
    })
}

function calculeMenor(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = menorNum(number1, number2);
    res.json({
        resultado: result
    })
}

function calculeProm(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = promNum(number1, number2);
    res.json({
        resultado: result
    })
}
module.exports = {
    sumar,
    restar,
    multiplicar,
    calculeMayor,
    calculeMenor,
    calculeProm
}