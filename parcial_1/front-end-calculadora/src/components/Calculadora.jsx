import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [A, setA] = useState('');
    const [B, setB] = useState('');
    const [C, setC] = useState('');
    const [D, setD] = useState('');
    const [E, setE] = useState('');
    const [F, setF] = useState('');

    const [selectedA, setSelectedA] = useState(false);
    const [selectedB, setSelectedB] = useState(false);
    const [selectedC, setSelectedC] = useState(false);
    const [selectedD, setSelectedD] = useState(false);
    const [selectedE, setSelectedE] = useState(false);
    const [selectedF, setSelectedF] = useState(false);

    const [ecuacion, setEcuacion] = useState('');
    const [resultado, setResultado] = useState('');

    const handleSubmit = (orden) => {
        // Crear un array con los números seleccionados
        let numeros = [];
        if (selectedA) numeros.push(parseFloat(A));
        if (selectedB) numeros.push(parseFloat(B));
        if (selectedC) numeros.push(parseFloat(C));
        if (selectedD) numeros.push(parseFloat(D));
        if (selectedE) numeros.push(parseFloat(E));
        if (selectedF) numeros.push(parseFloat(F));

        // Enviar la solicitud al backend con la operación seleccionada (ascendente o descendente)
        fetch(`http://localhost:3500/v1/calculadora/${orden}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numeros })
        })
        .then(res => res.json())
        .then(responseData => {
            setResultado(responseData.resultado);
        })
        .catch(error => {
            console.error("Error al realizar la operación:", error);
            setResultado("Error en la operación");
        });
    };

    const handleEcuacionSubmit = () => {
        // Crear un objeto con las variables activadas y sus valores
        const variables = {};
        if (selectedA) variables.A = parseFloat(A);
        if (selectedB) variables.B = parseFloat(B);
        if (selectedC) variables.C = parseFloat(C);
        if (selectedD) variables.D = parseFloat(D);
        if (selectedE) variables.E = parseFloat(E);
        if (selectedF) variables.F = parseFloat(F);

        // Enviar la ecuación al backend con los valores de las variables activadas
        fetch('http://localhost:3500/v1/calculadora/ecuacion', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ecuacion, variables })
        })
        .then(res => res.json())
        .then(responseData => {
            setResultado(responseData.resultado);
        })
        .catch(error => {
            console.error("Error al procesar la ecuación:", error);
            setResultado("Error en la operación");
        });
    };

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                <label>A</label>
                <input type="checkbox" onChange={(e) => setSelectedA(e.target.checked)} />
                <input type="text" value={A} disabled={!selectedA} onChange={(e) => setA(e.target.value)} /><br />

                <label>B</label>
                <input type="checkbox" onChange={(e) => setSelectedB(e.target.checked)} />
                <input type="text" value={B} disabled={!selectedB} onChange={(e) => setB(e.target.value)} /><br />

                <label>C</label>
                <input type="checkbox" onChange={(e) => setSelectedC(e.target.checked)} />
                <input type="text" value={C} disabled={!selectedC} onChange={(e) => setC(e.target.value)} /><br />

                <label>D</label>
                <input type="checkbox" onChange={(e) => setSelectedD(e.target.checked)} />
                <input type="text" value={D} disabled={!selectedD} onChange={(e) => setD(e.target.value)} /><br />

                <label>E</label>
                <input type="checkbox" onChange={(e) => setSelectedE(e.target.checked)} />
                <input type="text" value={E} disabled={!selectedE} onChange={(e) => setE(e.target.value)} /><br />

                <label>F</label>
                <input type="checkbox" onChange={(e) => setSelectedF(e.target.checked)} />
                <input type="text" value={F} disabled={!selectedF} onChange={(e) => setF(e.target.value)} /><br />

                <button type="button" onClick={() => handleSubmit('ascendente')}>Ascendente</button>
                <button type="button" onClick={() => handleSubmit('descendente')}>Descendente</button><br /><br />

                {/* Nueva funcionalidad para ecuaciones */}
                <label>Ecuación: </label>
                <input 
                    type="text" 
                    value={ecuacion} 
                    onChange={(e) => setEcuacion(e.target.value)} 
                    placeholder="Ejemplo: 2A + B"
                />
                <button type="button" onClick={handleEcuacionSubmit}>OK</button>
            </form>

            <Resultado resultado={"El resultado es " + resultado} />
        </div>
    );
}

export default Calculadora;
