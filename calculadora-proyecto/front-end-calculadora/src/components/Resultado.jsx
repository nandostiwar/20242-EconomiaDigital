import React from 'react';
import '../styles/Resultado.css'; // Asegúrate de tener este archivo para los estilos

function Resultado({ resultado }) {
    return (
        <div className="result">
            {resultado}
        </div>
    );
}

export default Resultado;
