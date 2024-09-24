import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Importamos el archivo CSS

function App() {
    const [valores, setValores] = useState({ A: '', B: '', C: '', D: '', E: '', F: '' });
    const [seleccionados, setSeleccionados] = useState({ A: false, B: false, C: false, D: false, E: false, F: false });
    const [resultadoOrden, setResultadoOrden] = useState([]);
    const [ecuacion, setEcuacion] = useState('');
    const [resultadoEcuacion, setResultadoEcuacion] = useState(null);

    const handleInputChange = (e) => {
        setValores({ ...valores, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setSeleccionados({ ...seleccionados, [e.target.name]: e.target.checked });
    };

    const ordenarAscendente = () => {
        const numerosSeleccionados = Object.keys(seleccionados)
            .filter(key => seleccionados[key])
            .map(key => Number(valores[key]));

        axios.post('http://localhost:5000/ordenar/ascendente', { numerosSeleccionados })
            .then(response => setResultadoOrden(response.data.sortedNumbers))
            .catch(error => console.error(error));
    };

    const ordenarDescendente = () => {
        const numerosSeleccionados = Object.keys(seleccionados)
            .filter(key => seleccionados[key])
            .map(key => Number(valores[key]));

        axios.post('http://localhost:5000/ordenar/descendente', { numerosSeleccionados })
            .then(response => setResultadoOrden(response.data.sortedNumbers))
            .catch(error => console.error(error));
    };

    const calcularEcuacion = () => {
        axios.post('http://localhost:5000/calcular-ecuacion', { ecuacion, valores })
            .then(response => setResultadoEcuacion(response.data.resultado))
            .catch(error => console.error(error));
    };

    return (
        <div className="container">
            <div className="left-column">
                <h1>Calculadora</h1>
                {['A', 'B', 'C', 'D', 'E', 'F'].map((campo) => (
                    <div key={campo} className="inputGroup">
                        <input
                            type="number"
                            name={campo}
                            value={valores[campo]}
                            onChange={handleInputChange}
                            className="inputField"
                            placeholder={`Campo ${campo}`}
                        />
                        <label className="checkboxLabel">
                            <input
                                type="checkbox"
                                name={campo}
                                checked={seleccionados[campo]}
                                onChange={handleCheckboxChange}
                            />
                            Seleccionar
                        </label>
                    </div>
                ))}
            </div>

            <div className="right-column">
                <div className="buttonGroup">
                    <button className="button" onClick={ordenarAscendente}>Ordenar Ascendente</button>
                    <button className="button buttonSecondary" onClick={ordenarDescendente}>Ordenar Descendente</button>
                </div>

                {resultadoOrden.length > 0 && <div className="resultBox">Resultado: {resultadoOrden.join(', ')}</div>}

                <div className="equationSection">
                    <input
                        type="text"
                        value={ecuacion}
                        onChange={(e) => setEcuacion(e.target.value)}
                        className="equationInput"
                        placeholder="Escribe la ecuación (ej. 2A + 3B)"
                    />
                    <button className="button" onClick={calcularEcuacion}>Calcular</button>
                </div>

                {resultadoEcuacion !== null && <div className="resultBox">Resultado Ecuación: {resultadoEcuacion}</div>}
            </div>
        </div>
    );
}

export default App;
