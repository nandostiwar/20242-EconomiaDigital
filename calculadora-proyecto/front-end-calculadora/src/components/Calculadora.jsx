import React, { useState } from 'react';
import '../styles/Calculadora.css';


function Calculadora() {
    const [numbers, setNumbers] = useState({ A: '', B: '', C: '', D: '', E: '', F: '' });
    const [result, setResult] = useState('');
    const [resultecuacion, setResultecuacion] = useState('');
    const [order, setOrder] = useState('asc');
    const [ecuacion, setEcuacion] = useState('');
    const [equation, setEquation] = useState('');
    const [enabledFields, setEnabledFields] = useState({ A: true, B: true, C: true, D: true, E: true, F: true });

    // Maneja el cambio de valores en los campos de texto
    const handleChange = (e) => {
        setNumbers({ ...numbers, [e.target.name]: e.target.value });
    };

    // Maneja el cambio de estado de las casillas de verificación
    const handleCheckboxChange = (e) => {
        setEnabledFields({ ...enabledFields, [e.target.name]: e.target.checked });
    };

    // Enviar los números para ser ordenados al backend
    const handleSort = async (order) => {
        // Obtener solo los números habilitados
        const enabledNumbers = Object.keys(numbers)
            .filter(key => enabledFields[key]) // Solo incluir los campos habilitados
            .map(key => Number(numbers[key])) // Convertir los valores a números
            .filter(num => !isNaN(num)); // Filtrar números no válidos

        try {
            const response = await fetch('http://localhost:3500/v1/calculadora/ordenar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    numbers: Object.values(numbers).map(Number).filter(num => !isNaN(num))
                })
            });

            const data = await response.json();
            setResult(`Sorted Numbers: ${data.sortedNumbers.join(', ')}`);
        } catch (error) {
            console.error('Error al ordenar los números:', error);
            setResult('Error al ordenar los números');

        }

        console.log("numeros ordenados", result);

    };

    const handleSort1 = async (order) => {
        // Obtener solo los números habilitados
        const enabledNumbers = Object.keys(numbers)
            .filter(key => enabledFields[key]) // Solo incluir los campos habilitados
            .map(key => Number(numbers[key])) // Convertir los valores a números
            .filter(num => !isNaN(num)); // Filtrar números no válidos

        try {
            const response = await fetch('http://localhost:3500/v1/calculadora/ordenar1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    numbers: Object.values(numbers).map(Number).filter(num => !isNaN(num))
                })
            });

            const data = await response.json();
            setResult(`Sorted Numbers: ${data.sortedNumbers.join(', ')}`);
        } catch (error) {
            console.error('Error al ordenar los números:', error);
            setResult('Error al ordenar los números');

        }

        console.log("numeros ordenados", result);

    };

    const ecuacion1 = async () => {
        if (!ecuacion) {
            console.error("Error: La ecuación no está definida.");
            return;
        }
    
        const response = await fetch('http://localhost:3500/v1/calculadora/resolver', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ecuacion,numbers }) // Solo envía la ecuación
        });
        const data = await response.json();
        setResultecuacion(`Resultado: ${data.resultado}`);
        console.log(data);
    };

    const calcularEcuacion = () => {
        axios.post('http://localhost:3500/v1/calculadora/resolver', { ecuacion, numbers })
            .then(response => setResultadoEcuacion(response.data.resultado))
            .catch(error => console.error(error));
    };



    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                {Object.keys(numbers).map(key => (
                    <div key={key} className="input-group">
                        <input
                            type="text"
                            name={key}
                            value={numbers[key]}
                            onChange={handleChange}
                            placeholder={`Número ${key}`}
                            disabled={!enabledFields[key]} // Deshabilitar según el estado
                        />
                        <label>
                            <input
                                type="checkbox"
                                name={key}
                                checked={enabledFields[key]}
                                onChange={handleCheckboxChange}
                            />
                            Habilitar
                        </label>
                    </div>
                ))}
            </form>
            <div>
                <button onClick={() => handleSort('asc')}>Ascendente</button>
                <button onClick={() => handleSort1('desc')}>Descendente</button>
            </div>
            
            <div>
            <form onSubmit={handleEcuacionSubmit}>
            </form>

                <input
                    type="text"
                    value={ecuacion}
                    onChange={(e) => setEcuacion(e.target.value)}
                    className="equationInput"
                    placeholder="Escribe la ecuación (ej. 2A + 3B)"
                />
                <button onClick={ecuacion1}>EvaluarEcuación</button>
            </div>
            <div className="resultBox"> {result || resultecuacion}
            </div>

        </div>
    );
}

export default Calculadora;
