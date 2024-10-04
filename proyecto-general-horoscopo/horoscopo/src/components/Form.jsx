import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();


    async function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            fetch(`http://localhost:4000/v1/signos/login`)
                .then(response => response.json())
                .then(responseData => setTextoSigno(responseData))
        } 
    }
    

 
    const validateUser = (event)=>{
        event.preventDefault();
        if(username === handleSelect && password === 'user2023'){
            callback("user");
            goTo("/userHome");

        }else if(username === 'admin' && password==='admin2023'){
            callback("admin");
            goTo("/adminHome");
        }
        
    }
    return (
        <div className='container '> 
            <form onSubmit={validateUser} className='form pt-3 '>

                <div className='col col-12 pt-4'>

                    <div className='row'>
                        <div className='col col-3'> </div>
                        <div className='col col-6'>

                        <h2 id="txtBienvenida" className='mb-4'>Bienvenido al portal del Zodiaco</h2>

                            <div className='pt-1'> 
                                <label class="form-label" for='nombre'> Nombre de usuario </label>
                                <input type="text" className="form-control" id='nombre' onChange={(e)=> setUsername(e.target.value)}/>
                            </div>

                            <div className='pb-4 pt-3'>
                                <label class="form-label" for='clave'> Contraseña </label>
                                <input type="password" className="form-control" id='clave' onChange={(e)=> setPassword(e.target.value)}/>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <input className='btn btn-primary' type="submit" value="Ingresar" id="btnEnviar"/>
                            </div>

                        </div>
                        <div className='col col-3'> </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Form;