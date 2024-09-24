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
    const [operacion, setOperacion] = useState(''); // Corregido el nombre de estado
    const [ecuacion, setEcuacion] = useState(''); // Estado para la ecuación

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
      setEcuacion(e.target.value); // Actualiza el valor de la ecuación
    };

    const resolverEcuacion = () => {
      let ecuacionResuelta = ecuacion;

      // Reemplaza las letras en la ecuación por los valores correspondientes
      Object.keys(number).forEach((key) => {
        if (estadoSelector[key] && number[key] !== '') {
          const valorNumerico = parseFloat(number[key]);

          // Reemplazo con multiplicación si es necesario
          ecuacionResuelta = ecuacionResuelta.replace(new RegExp(`(\\d+)\\s*${key}`, 'g'), `$1 * ${valorNumerico}`);
          ecuacionResuelta = ecuacionResuelta.replace(new RegExp(`\\b${key}\\b`, 'g'), valorNumerico);
        }
      });

      try {
        // Usa mathjs para evaluar la ecuación resuelta
        const resultadoFinal = evaluate(ecuacionResuelta);
        setResultado(resultadoFinal);
      } catch (error) {
        setResultado("Error en la ecuación: " + error.message);
      }
    };
  
    function handleSubmit(e) {
      e.preventDefault();

      // Filtrar valores seleccionados
      const selectedValues = Object.keys(number)
      .filter(key => estadoSelector[key] && number[key] !== '')
      .reduce((acc, key) => {
        acc[key] = number[key]; // Agregar claves y valores al objeto
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
          setResultado2(responseData); // Solo un setResultado es suficiente
      })
      .catch(error => {
          console.error('Error:', error);
      });
    }
    console.log(typeof resultado2)
    return (
      <div className="container">
        <h1 id="txtCalculadora">CALCULADORA PARCIAL </h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(number).map((key) => (
            <div key={key}>
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

          {/* Input para la ecuación */}
          <label htmlFor="">Ecuaciónes</label>
          <input 
            type="text" 
            value={ecuacion} 
            onChange={handleEcuacionChange} 
            placeholder="Ej: 3D/2A + B"
          />

          {/* Botones para asignar operaciones */}
          <input type="submit" value="ascendente" onClick={(e) => setOperacion(e.target.value)} />
          <input type="submit" value="descendente" onClick={(e) => setOperacion(e.target.value)} />

        </form>

        {/* Botón para resolver la ecuación */}
        <button onClick={resolverEcuacion}>
          Resolver ecuación
        </button>

        {/* Mostrar el resultado */}
        {resultado && <div>Resultado: {resultado}</div>}
        <h3> {resultado2}</h3>
      </div>
    );
}

export default Calculadora;