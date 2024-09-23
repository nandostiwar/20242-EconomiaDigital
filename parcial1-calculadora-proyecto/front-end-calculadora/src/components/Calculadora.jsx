import { useState } from "react";
import { evaluate } from 'mathjs';
import '../styles/Calculadora.css';

function Calculadora() {
    const [number, setNumber] = useState({
      "A": "", "B": "", "C": "", "D": "", "E": "", "F": ""
    });

    const [estadoSelector, setEstadoSelector] = useState({
      "A": false, "B": false, "C": false, "D": false, "E": false, "F": false
    });

    const [resultado, setResultado] = useState('');
    const [resultado2, setResultado2] = useState('');
    const [operacion, setOperacion] = useState('');
    const [ecuacion, setEcuacion] = useState('');

    const agregarNumerChange = (key, event) => {
      setNumber(prevState => ({
        ...prevState,
        [key]: event.target.value
      }));
    };

    const checkboxChange = (key) => {
      setEstadoSelector(prevState => ({
        ...prevState,
        [key]: !prevState[key]
      }));
    };

    const handleEcuacionChange = (e) => {
      setEcuacion(e.target.value);
    };

    const resolverEcuacion = () => {
      let ecuacionResuelta = ecuacion;

      Object.keys(number).forEach((key) => {
        if (estadoSelector[key] && number[key] !== '') {
          const valorNumerico = parseFloat(number[key]);
          ecuacionResuelta = ecuacionResuelta.replace(new RegExp(`(\\d+)\\s*${key}`, 'g'), `$1 * ${valorNumerico}`);
          ecuacionResuelta = ecuacionResuelta.replace(new RegExp(`\\b${key}\\b`, 'g'), valorNumerico);
        }
      });

      try {
        const resultadoFinal = evaluate(ecuacionResuelta);
        setResultado(resultadoFinal);
      } catch (error) {
        setResultado("Error en la ecuación: " + error.message);
      }
    };

    function handleSubmit(e) {
      e.preventDefault();

      const selectedValues = Object.keys(number)
        .filter(key => estadoSelector[key] && number[key] !== '')
        .reduce((acc, key) => {
          acc[key] = number[key];
          return acc;
        }, {});

      const url = operacion === 'ascendente' 
        ? 'http://localhost:3500/v1/calculadora/ascendente' 
        : 'http://localhost:3500/v1/calculadora/descendente';

      fetch(url, {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({...selectedValues})
      })
      .then(res => res.json())
      .then(responseData => {
          setResultado2(responseData);
      })
      .catch(error => {
          console.error('Error:', error);
      });
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form onSubmit={handleSubmit}>
                <div className="numeros-container">
                    {Object.keys(number).map((key) => (
                        <div key={key} className="label-input">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={estadoSelector[key]}
                                    onChange={() => checkboxChange(key)}
                                />
                                {key}
                            </label>
                            <input 
                                type="text"
                                placeholder={`Ingrese número ${key}`}
                                value={number[key]}
                                onChange={(event) => agregarNumerChange(key, event)}
                            />
                        </div>
                    ))}
                </div>

                <div className="button-container">
                    <input type="submit" value="ascendente" onClick={(e) => setOperacion(e.target.value)} />
                    <input type="submit" value="descendente" onClick={(e) => setOperacion(e.target.value)} />
                </div>

                {resultado2 && <div className="resultado">Resultado: {resultado2}</div>}

                <label htmlFor="">Ecuación</label>
                <input 
                    type="text" 
                    value={ecuacion} 
                    onChange={handleEcuacionChange} 
                    placeholder="Ingrese Ecuación, EJ: 2A+3D"
                />
            </form>
            <button onClick={resolverEcuacion}>
                Resolver ecuación
            </button>

            {resultado && <div className="resultado">Resultado: {resultado}</div>}
            {/* <h3>{resultado2}</h3> */}
        </div>
    );
}

export default Calculadora;



