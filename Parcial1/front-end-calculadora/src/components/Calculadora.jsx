import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');
    const [number4, setNumber4] = useState('');
    const [number5, setNumber5] = useState('');
    const [number6, setNumber6] = useState('');
    const [resultado, setResultado] = useState('');
    const [checks, setChecks] = useState([false, false, false, false, false, false]);

    // Estados adicionales para la funcionalidad de ecuación
    const [isEcuacion, setIsEcuacion] = useState(false);
    const [ecuacion, setEcuacion] = useState('');

    // Función para manejar la presentación de operaciones básicas
    function handleSubmit(e) {
        e.preventDefault();
        const operacion = e.target.value;

        // Recopilar solo los números que tienen los checkboxes marcados
        const numeros = [
            checks[0] ? parseFloat(number1) : null,
            checks[1] ? parseFloat(number2) : null,
            checks[2] ? parseFloat(number3) : null,
            checks[3] ? parseFloat(number4) : null,
            checks[4] ? parseFloat(number5) : null,
            checks[5] ? parseFloat(number6) : null
        ].filter(num => num !== null); // Filtrar los null

        if (operacion !== "ecuacion") {
            if (numeros.length === 0) {
                setResultado("Por favor, selecciona al menos un número.");
                return;
            }

            let calculo = 0;

            if (operacion === "sumar") {
                calculo = numeros.reduce((acc, curr) => acc + curr, 0);
            }
            if (operacion === "restar") {
                calculo = numeros.reduce((acc, curr) => acc - curr);
            }
            if (operacion === "multiplicar") {
                calculo = numeros.reduce((acc, curr) => acc * curr, 1);
            }

            setResultado(calculo);
        } else {
            // Activar el modo de ecuación
            setIsEcuacion(true);
            setResultado(''); // Limpiar el resultado anterior
        }
    }

    // Función para manejar la presentación de la ecuación
    function handleEcuacionSubmit(e) {
        e.preventDefault();

        if (!ecuacion.trim()) {
            setResultado("Por favor, ingresa una ecuación válida.");
            return;
        }

        // Enviar la ecuación al servidor para su procesamiento
        fetch(`http://localhost:3500/v1/calculadora/ecuacion`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ecuacion })
        })
        .then(res => res.json())
        .then(responseData => {
            setResultado(responseData.resultado);
            setIsEcuacion(false); // Desactivar el modo de ecuación después de procesar
            setEcuacion(''); // Limpiar el campo de ecuación
        })
        .catch(error => {
            console.error("Error al procesar la ecuación:", error);
            setResultado("="+ecuacion);
        });
    }

    // Función para manejar los cambios en los checkboxes
    function handleCheckChange(index) {
        const newChecks = [...checks];
        newChecks[index] = !newChecks[index];
        setChecks(newChecks);
    }

    // Función para ordenar de forma ascendente
    const ordenarAscendente = () => {
        const numeros = [
            checks[0] ? parseFloat(number1) : null,
            checks[1] ? parseFloat(number2) : null,
            checks[2] ? parseFloat(number3) : null,
            checks[3] ? parseFloat(number4) : null,
            checks[4] ? parseFloat(number5) : null,
            checks[5] ? parseFloat(number6) : null
        ].filter(num => num !== null); // Filtrar los null

        if (numeros.length === 0) {
            setResultado("Por favor, selecciona al menos un número para ordenar.");
            return;
        }

        numeros.sort((a, b) => a - b);
        setResultado(`Orden Ascendente: ${numeros.join(', ')}`);
    };

    // Función para ordenar de forma descendente
    const ordenarDescendente = () => {
        const numeros = [
            checks[0] ? parseFloat(number1) : null,
            checks[1] ? parseFloat(number2) : null,
            checks[2] ? parseFloat(number3) : null,
            checks[3] ? parseFloat(number4) : null,
            checks[4] ? parseFloat(number5) : null,
            checks[5] ? parseFloat(number6) : null
        ].filter(num => num !== null); // Filtrar los null

        if (numeros.length === 0) {
            setResultado("Por favor, selecciona al menos un número para ordenar.");
            return;
        }

        numeros.sort((a, b) => b - a);
        setResultado(`Orden Descendente: ${numeros.join(', ')}`);
    };

    // Función para manejar el botón "Borrar"
    const handleBorrar = () => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas borrar todos los campos?");
        if (confirmacion) {
            setNumber1('');
            setNumber2('');
            setNumber3('');
            setNumber4('');
            setNumber5('');
            setNumber6('');
            setChecks([false, false, false, false, false, false]);
            setResultado('');
            setIsEcuacion(false);
            setEcuacion('');
        }
    };

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>

            <div className="cuadritos">
                {['A', 'B', 'C'].map((letter, index) => (
                    <div className="cuadro" key={index}>
                        <label>{letter}</label>
                        <input 
                            type="number" 
                            value={index === 0 ? number1 : index === 1 ? number2 : number3}
                            onChange={(e) => {
                                if (index === 0) setNumber1(e.target.value);
                                if (index === 1) setNumber2(e.target.value);
                                if (index === 2) setNumber3(e.target.value);
                            }} 
                        />
                        <input 
                            type="checkbox" 
                            checked={checks[index]} 
                            onChange={() => handleCheckChange(index)} 
                        />
                    </div>
                ))}
            </div>

            <div className="cuadritos">
                {['D', 'E', 'F'].map((letter, index) => (
                    <div className="cuadro" key={index + 3}>
                        <label>{letter}</label>
                        <input 
                            type="number" 
                            value={index === 0 ? number4 : index === 1 ? number5 : number6}
                            onChange={(e) => {
                                if (index === 0) setNumber4(e.target.value);
                                if (index === 1) setNumber5(e.target.value);
                                if (index === 2) setNumber6(e.target.value);
                            }} 
                        />
                        <input 
                            type="checkbox" 
                            checked={checks[index + 3]} 
                            onChange={() => handleCheckChange(index + 3)} 
                        />
                    </div>
                ))}
            </div>

            <div>
                <input 
                    type="submit" 
                    className="btnEnviar" 
                    value="sumar" 
                    onClick={handleSubmit} 
                />
                <input 
                    type="submit" 
                    className="btnEnviar" 
                    value="restar" 
                    onClick={handleSubmit} 
                />
                <input 
                    type="submit" 
                    className="btnEnviar" 
                    value="multiplicar" 
                    onClick={handleSubmit} 
                />
                <input 
                    type="submit" 
                    className="btnEnviar" 
                    value="ecuacion" 
                    onClick={handleSubmit} 
                />
                <button 
                    type="button" 
                    className="btnEnviar" 
                    onClick={handleBorrar}
                >
                    Borrar
                </button>
            </div>

            {isEcuacion && (
                <div className="ecuacion-formulario">
                    <h2>Ingrese su Ecuación</h2>
                    <form onSubmit={handleEcuacionSubmit}>
                        <input 
                            type="text" 
                            value={ecuacion} 
                            onChange={(e) => setEcuacion(e.target.value)} 
                            placeholder="Ejemplo: 2*x + 3 = 7"
                            required
                        />
                        <button type="submit" className="btnEnviar">Enviar Ecuación</button>
                    </form>
                </div>
            )}

            <div>
                <button className="btnOrden" onClick={ordenarAscendente}>Ascendente</button>
                <button className="btnOrden" onClick={ordenarDescendente}>Descendente</button>
            </div>

            <Resultado resultado={resultado ? `El resultado es: ${resultado}` : ""} />
        </div>
    );
}

export default Calculadora;
