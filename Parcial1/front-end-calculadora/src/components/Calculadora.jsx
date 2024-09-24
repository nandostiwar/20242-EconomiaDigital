import { useState } from "react";
import '../styles/Calculadora.css';
import { evaluate } from 'mathjs';
import Resultado from "./Resultado";

function Calculadora() {
    const [numA, setNumA] = useState('');
    const [numB, setNumB] = useState('');
    const [numC, setNumC] = useState('');
    const [numD, setNumD] = useState('');
    const [numE, setNumE] = useState('');
    const [numF, setNumF] = useState('');
    const [resultadoOrden, setResultadoOrden] = useState('');
    const [resultadoEcuacion, setResultadoEcuacion] = useState('');
    const [checks, setChecks] = useState([false, false, false, false, false, false]);
    const [ecuacion, setEcuacion] = useState('');

    const handleNumberChange = (setter) => (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value.trim() !== '') {
            setter(value);
        } else {
            setter(''); // Resetear si no es un número
        }
    };

    function getCheckedNumbers() {
        const numbers = [];
        if (checks[0]) numbers.push(parseFloat(numA));
        if (checks[1]) numbers.push(parseFloat(numB));
        if (checks[2]) numbers.push(parseFloat(numC));
        if (checks[3]) numbers.push(parseFloat(numD));
        if (checks[4]) numbers.push(parseFloat(numE));
        if (checks[5]) numbers.push(parseFloat(numF));
        return numbers;
    }

    function handleAscendente() {
        const numbers = getCheckedNumbers();
        if (numbers.length === 0) {
            setResultadoOrden("No hay números seleccionados.");
            return;
        }
        fetch('http://localhost:3500/v1/calculadora/ascendente', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numbers })
        })
        .then(res => res.json())
        .then(responseData => {
            setResultadoOrden("Orden ascendente: " + responseData.sortedNumbers.join(', '));
            setResultadoEcuacion(''); // Opcional: reiniciar resultadoEcuacion al hacer una ordenación
        });
    }

    function handleDescendente() {
        const numbers = getCheckedNumbers();
        if (numbers.length === 0) {
            setResultadoOrden("No hay números seleccionados");
            return;
        }
        fetch('http://localhost:3500/v1/calculadora/descendente', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numbers })
        })
        .then(res => res.json())
        .then(responseData => {
            setResultadoOrden("Orden descendente: " + responseData.sortedNumbers.join(', '));
            // Eliminada la línea que reiniciaba resultadoEcuacion
        });
    }

    function handleCheckChange(index) {
        const newChecks = [...checks];
        newChecks[index] = !newChecks[index];
        setChecks(newChecks);
    }

    function handleEcuacionSubmit() {
        const variables = {};
        if (checks[0]) variables['A'] = numA;
        if (checks[1]) variables['B'] = numB;
        if (checks[2]) variables['C'] = numC;
        if (checks[3]) variables['D'] = numD;
        if (checks[4]) variables['E'] = numE;
        if (checks[5]) variables['F'] = numF;

        // Evaluar la ecuación localmente
        try {
            // Crear una copia de la ecuación para evitar mutaciones
            let ecuacionEvaluada = ecuacion;

            // Reemplazar las variables por sus valores
            for (const [key, value] of Object.entries(variables)) {
                ecuacionEvaluada = ecuacionEvaluada.replace(new RegExp(key, 'g'), value);
            }

            // Evaluar la ecuación utilizando mathjs
            const resultado = evaluate(ecuacionEvaluada);
            setResultadoEcuacion(`Resultado local: ${resultado}`);
        } catch (error) {
            setResultadoEcuacion(`Error al evaluar localmente: ${error.message}`);
        }

        // Enviar la ecuación al backend
        fetch('http://localhost:3500/v1/calculadora/ecuacion', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                equation: ecuacion,
                variables
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return res.json();
        })
        .then(responseData => {
            setResultadoEcuacion(`El resultado de la ecuación es: ${responseData.resultado}`);
            // No reiniciar el resultadoOrden aquí
        })
        .catch(error => {
            setResultadoEcuacion(`Error al procesar la ecuación: ${error.message}`);
            // No reiniciar el resultadoOrden aquí
        });
    }

    function handleClear() {
        // Restablecer todos los campos y resultados
        setNumA('');
        setNumB('');
        setNumC('');
        setNumD('');
        setNumE('');
        setNumF('');
        setResultadoOrden('');
        setResultadoEcuacion('');
        setChecks([false, false, false, false, false, false]);
        setEcuacion('');
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">MI CALCULADORA</h1>

            <div className="cuadritos">
                {['A', 'B', 'C'].map((letter, index) => (
                    <div className="cuadro" key={index}>
                        <label>{letter}</label>
                        <input 
                            type="text" 
                            value={index === 0 ? numA : index === 1 ? numB : numC}
                            onChange={handleNumberChange(index === 0 ? setNumA : index === 1 ? setNumB : setNumC)} 
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
                            type="text" 
                            value={index === 0 ? numD : index === 1 ? numE : numF}
                            onChange={handleNumberChange(index === 0 ? setNumD : index === 1 ? setNumE : setNumF)} 
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
                <button className="btnOrden" onClick={handleAscendente}>Ascendente</button>
                <button className="btnOrden" onClick={handleDescendente}>Descendente</button>
            </div>

            <Resultado resultado={resultadoOrden} />

            <div className="ecuacion-container">
                <label>Ingresar la Ecuación:</label>
                <input 
                    type="text" 
                    value={ecuacion} 
                    onChange={(e) => setEcuacion(e.target.value)} 
                    placeholder="Ej: 2 * (A + B)" // Ejemplo de uso Es necesario poner parentesis para que se ejecute la ecuación correctamente
                />
                <button onClick={handleEcuacionSubmit}>OK</button>
            </div>

            <Resultado resultado={resultadoEcuacion} />

            <button className="btnLimpiar" onClick={handleClear}>Borrar todo</button>
        </div>
    );
}

export default Calculadora;
