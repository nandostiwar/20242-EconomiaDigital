import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
  const [numbers, setNumbers] = useState(Array(9).fill(''));
  const [checked, setChecked] = useState(Array(9).fill(false));
  const [resultado, setResultado] = useState('');

  function handleNumberChange(e, index) {
    const newNumbers = [...numbers];
    newNumbers[index] = e.target.value;
    setNumbers(newNumbers);
  }

  function handleCheckboxChange(e, index) {
    const newChecked = [...checked];
    newChecked[index] = e.target.checked;
    setChecked(newChecked);
  }

  function handleSort(order) {
    fetch(`http://localhost:3500/v1/calculadora/${order}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numbers, checked })
    })
      .then(res => res.json())
      .then(responseData => {
        setResultado(responseData.resultado);
      })
      .catch(error => {
        console.error("Error al comunicarse con el backend:", error);
      });
  }

  return (
    <div className="container">
      <h1 id="txtCalculadora">Ordenar Numeros</h1>
      <form>
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index}>
            <label>{String.fromCharCode(65 + index)}</label> {/* A, B, C, ... */}
            <input
              type="text"
              className="number"
              value={numbers[index]}
              onChange={(e) => handleNumberChange(e, index)}
            />
            <input
              type="checkbox"
              className="checkbox"
              checked={checked[index]}
              onChange={(e) => handleCheckboxChange(e, index)}
            />
          </div>
        ))}
      </form>
      <button className="btnEnviar" onClick={() => handleSort("ascendente")}>
        Ascendente
      </button>
      <button className="btnEnviar" onClick={() => handleSort("descendente")}>
        Descendente
      </button>
      <Resultado resultado={`El orden es: ${resultado}`} />
    </div>
  );
}

export default Calculadora;
