
const {add, subtract, multiply, showa, showd} = require('../operaciones/operaciones.js');

function sumar(req, res){
    const {body} = req;
    const {number1, number2, number3, number4} = body;
    const result = add(number1, number2, number3, number4);
    console.log("num1: " + String(number1) + " num2: " + String(number2) + " num3: " + String(number3) + " num4: " + String(number4) + " y la suma: " + String(result))
    res.json({
        resultado: result
    });
}

function restar(req, res){
    const {body} = req;
    const {number1, number2, number3, number4} = body;
    const result = subtract(number1, number2, number3, number4);
    console.log("num1: " + String(number1) + " num2: " + String(number2) + " num3: " + String(number3) + " num4: " + String(number4) + " y la resta: " + String(result))
    res.json({
        resultado: result
    })
}

function multiplicar(req, res){
    const {body} = req;
    const {number1, number2, number3, number4} = body;
    const result = multiply(number1, number2, number3, number4);
    console.log("num1: " + String(number1) + " num2: " + String(number2) + " num3: " + String(number3) + " num4: " + String(number4) + " y la multiplicación: " + String(result))
    res.json({
        resultado: result
    })
}

function mostrarascendente(req, res){
    const {body} = req;
    const {number1, number2, number3, number4} = body;
    const result = showa(number1, number2, number3, number4);
    console.log("num1: " + String(number1) + " num2: " + String(number2) + " num3: " + String(number3) + " num4: " + String(number4) + " y los números son: " + String(result))
    res.json({
        resultado: result
    })
}

function mostrardescendente(req, res){
    const {body} = req;
    const {number1, number2, number3, number4} = body;
    const result = showd(number1, number2, number3, number4);
    console.log("num1: " + String(number1) + " num2: " + String(number2) + " num3: " + String(number3) + " num4: " + String(number4) + " y los números son: " + String(result))
    res.json({
        resultado: result
    })
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    mostrarascendente,
    mostrardescendente
}