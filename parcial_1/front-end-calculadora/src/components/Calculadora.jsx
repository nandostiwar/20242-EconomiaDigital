import { useState } from "react";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";

function Calculadora(){
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');
    const [number4, setNumber4] = useState('');
    const [resultado, setResultado] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        const operacion = e.target.value;
        if (operacion == "sumar"){setResultado(parseFloat(number1)+parseFloat(number2)+parseFloat(number3)+parseFloat(number4))}
        if (operacion == "restar"){setResultado(parseFloat(number1)+parseFloat(number2)+parseFloat(number3)+parseFloat(number4))}
        if (operacion == "multiplicar"){setResultado(parseFloat(number1)+parseFloat(number2)+parseFloat(number3)+parseFloat(number4))}
        
        if (operacion == "mostrarascendente"){setResultado(parseFloat(number1)+parseFloat(number2)+parseFloat(number3)+parseFloat(number4))}
        if (operacion == "mostrardescendente"){setResultado(parseFloat(number1)+parseFloat(number2)+parseFloat(number3)+parseFloat(number4))}

        fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({number1, number2, number3, number4})
        })
            .then(res =>res.json())
            .then(responseData => {
                setResultado(responseData.resultado)
                // setResultado(responseData)
                // console.log(resultado)
            })
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">PARCIAL 1</h1>
            <h3 id="txtCalculadora">ECONOMÍA DIGITAL</h3>
            <h3 id="txtCalculadora">Alejandro Calderón 217097</h3>
            <form>

            <input type="checkbox" id="cbox1" value="second_checkbox" />
            <input type="number" className="number" onChange={(e)=>{setNumber1(e.target.value)}} required/>

            <input type="checkbox" id="cbox2" value="second_checkbox" />
            <input type="number" className="number" onChange={(e)=>{setNumber2(e.target.value)}} required/><br />

            <input type="checkbox" id="cbox3" value="second_checkbox" />
            <input type="number" className="number" onChange={(e)=>{setNumber3(e.target.value)}} required/>

            <input type="checkbox" id="cbox4" value="second_checkbox" />
            <input type="number" className="number" onChange={(e)=>{setNumber4(e.target.value)}} required/><br /><br />

                <input type="submit" className="btnEnviar" value="mostrarascendente" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="mostrardescendente" onClick={handleSubmit}/>
            
                <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="multiplicar" onClick={handleSubmit}/>
            </form>
            <Resultado resultado={"El resultado es "+ resultado}/>
        </div>
    )
}

export default Calculadora