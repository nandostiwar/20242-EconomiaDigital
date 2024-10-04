import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminHome({user}){
    if(user!=='admin' || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");

    function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            setSignoEditar(signo);
        } 
    }

    function goHome(){
        home("/");
    }

    function handleClick(e){
        // console.log(signoEditar);
        // console.log(textoEditar);
        e.preventDefault();
        fetch(`http://localhost:4000/v1/signos/${signoEditar}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"textoEditar": textoEditar})
        })
    }

    return (
        <div class="container">
            
            <h2  className="mt-4" id="textoAdmin">Edita un Signo Zodiacal</h2>
            <div className=" col col-6 mt-3">
                <div>
                    <select class="form-select" id="editSignos" onClick={handleSelect}>
                        <option value="0">Seleciona un signo zodiacal</option>
                        <option value="Aries">Aries</option>
                        <option value="Geminis">Géminis</option>
                        <option value="Cancer">Cáncer</option>
                        <option value="Leo">Leo</option>
                        <option value="Virgo">Virgo</option>
                        <option value="Libra">Libra</option>
                        <option value="Escorpio">Escorpio</option>
                        <option value="Sagitario">Sagitario</option>
                        <option value="Capricornio">Capricornio</option>
                        <option value="Acuario">Acuario</option>
                        <option value="Piscis">Piscis</option>
                    </select>
                </div>

                <div className="mt-2 mb-4">
                    <textarea class="form-control" id="textoEditar" cols="50" rows="5" onChange={(e)=> setTextoEditar(e.target.value)}></textarea>
                </div>

                <div > 
                    <button className="btn btn-primary me-2" id="btnEditar" onClick={handleClick}>Editar</button>
                    <button  className="btn btn-secondary" id="btnHomeAdmin" onClick={goHome}>Home</button>
                </div>

            </div>
        </div>
    )
}

export default AdminHome;