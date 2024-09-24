import { useState } from "react";
import '../index.css'
import Resultado from "./Resultado";

function Funciones(){
    const [resultadoEcuacion, setResultadoEcuacion] = useState('');
    const [resultadoOrden, setResultadoOrden] = useState('');
    const [Ecuacion, setEcuacion] = useState('');
    const [checks, setChecks] = useState([false, false, false, false, false, false]);
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');
    const [number4, setNumber4] = useState('');
    const [number5, setNumber5] = useState('');
    const [number6, setNumber6] = useState('');
    

    function getArrayNumbers() {
        const numbers = [];
        if (checks[0]) numbers.push(parseFloat(number1));
        if (checks[1]) numbers.push(parseFloat(number2));
        if (checks[2]) numbers.push(parseFloat(number3));
        if (checks[3]) numbers.push(parseFloat(number4));
        if (checks[4]) numbers.push(parseFloat(number5));
        if (checks[5]) numbers.push(parseFloat(number6));
        return numbers;
    }

    function handleCheckChange(index) {
        const newChecks = [...checks];
        newChecks[index] = !newChecks[index];
        setChecks(newChecks);

        if (document.getElementById("A").checked)
            document.getElementById('NumA').disabled = false;
          else
            document.getElementById('NumA').disabled = true;

        if (document.getElementById("B").checked)
            document.getElementById('NumB').disabled = false;   
        else
            document.getElementById('NumB').disabled = true;

        if (document.getElementById("C").checked)
            document.getElementById('NumC').disabled = false;   
        else
            document.getElementById('NumC').disabled = true;

        if (document.getElementById("D").checked)
            document.getElementById('NumD').disabled = false;   
        else
            document.getElementById('NumD').disabled = true;

        if (document.getElementById("E").checked)
            document.getElementById('NumE').disabled = false;   
        else
            document.getElementById('NumE').disabled = true;

        if (document.getElementById("F").checked)
            document.getElementById('NumF').disabled = false;   
        else
            document.getElementById('NumF').disabled = true;

    }

    const handleNumberChange = (setter) => (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value.trim() !== '') {
            setter(value);
        } else {
            setter(''); 
        }
    };

    function handleSubmitASC(e){
        const numbers = getArrayNumbers();
        if (numbers.length === 0) {
            setResultadoOrden("No ha seleccionado números.");
            return;
        }
        fetch(`http://localhost:8000/api/action/Ascendente`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ numbers })
        })
        .then(res =>res.json())
        .then(responseData => {
            setResultadoOrden("ascendente  :   " + responseData.sortedNumbers.join(', '));
        });
    }

    function handleSubmitDES(e){
        const numbers = getArrayNumbers();
        if (numbers.length === 0) {
            setResultadoOrden("No ha seleccionado números.");
            return;
        }
        fetch(`http://localhost:8000/api/action/Descendente`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ numbers })
        })
        .then(res =>res.json())
        .then(responseData => {
            setResultadoOrden("descendente  :   " + responseData.sortedNumbers.join(', '));
        });
    }

    function handleSubmitECU(e){
        const NUMS = {};
        if (checks[0]) NUMS['A'] = number1;
        if (checks[1]) NUMS['B'] = number2;
        if (checks[2]) NUMS['C'] = number3;
        if (checks[3]) NUMS['D'] = number4;
        if (checks[4]) NUMS['E'] = number5;
        if (checks[5]) NUMS['F'] = number6;
        
        fetch(`http://localhost:8000/api/action/Ecuacion`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                equation: Ecuacion,
                NUMS
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error();
            }
            return res.json();
        })
        .then(responseData => {
            setResultadoEcuacion(`Ecuación :   ${responseData.resultado}`);
        })
        .catch(error => {
            setResultadoEcuacion(`Ha ocurrido un error al evaluar la ecuación, por favor verifica la ecuación ${error.message}`);
        });
    }

    return (
        <div className="container col-12 ">
            <h1 id=" ">Parcial primer Corte</h1>
            
            <div className="row"> 

            {['A', 'B', 'C'].map((Letra, index) => (
                <div className="row border-bottom border-white border-5 pb-3 pt-4 col-4">
                    <div className="col col-1 pt-2 ps-2" key={index}>
                        <div className="form-check form-switch pt-4">
                                <input className="form-check-input btn btn-outline-primary" type="checkbox" id={Letra} checked={checks[index]}  onChange={() => handleCheckChange(index)} />
                        </div>
                    </div>
                    <div className="col col-8">
                        <div className="mb-3">
                            <label for={Letra} className="form-label form-check-label">Número {Letra} </label>
                            <input disabled type="number" className="form-control" id={"Num"+Letra} value={index === 0 ? number1 : index === 1 ? number2 : number3}
                            onChange={handleNumberChange(index === 0 ? setNumber1 : index === 1 ? setNumber2 : setNumber3)} />
                        </div>
                    </div>
                </div>
            ))}

            {['D', 'E', 'F'].map((Letra, index) => (
                <div className="row border-bottom border-white border-5 pb-5 col-4">
                    <div className="col col-1 pt-1 ps-2 " key={index + 3}>
                        <div className="form-check form-switch pt-4 ">
                                <input className="form-check-input btn btn-outline-primary" type="checkbox" id={Letra} checked={checks[index+ 3]}  onChange={() => handleCheckChange(index+ 3)} />
                        </div>
                    </div>
                    <div className="col col-8">
                        <div className="mb-0">
                            <label for={Letra}  className="form-label form-check-label">Número {Letra} </label>
                            <input disabled type="number" className="form-control" id={"Num"+Letra} value={index === 0 ? number4 : index === 1 ? number5 : number6}
                            onChange={handleNumberChange(index === 0 ? setNumber4 : index === 1 ? setNumber5 : setNumber6)} />
                        </div>
                    </div>
                </div>
            ))}


            </div>
                <div className="row  pb-1">

                    <div className="col col-2">
                            <div className=" "> <button  className="btn btn-primary" onClick={handleSubmitASC}> Ascendente </button> </div>
                    </div>
                    <div className="col col-2">
                            <div className=""> <button  className="btn btn-primary"  onClick={handleSubmitDES}> Descendente </button> </div>
                    </div>
                    <div className="col col-2">
                            <div className=""> <button  className="btn btn-primary"  onClick={handleSubmitECU}> Evaluar Ecuación </button> </div>
                    </div>
                    <div className="col col-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control border border-success" placeholder="Ecuación aquí" value={Ecuacion} onChange={(e) => setEcuacion(e.target.value)}/>
                        </div>
                    </div>

                </div>

                <div className="container">
                <h2 className="col col-10 border-bottom border-success text-start"> Orden  <h3> <Resultado resultado={resultadoOrden} /></h3> </h2>
                <h2 className="col col-10 border-bottom border-success text-start"> Resultado <h3><Resultado resultado={resultadoEcuacion} /> </h3> </h2>
            </div>
            
        </div>
    )
}

export default Funciones