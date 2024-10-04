import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        
        fetch('http://localhost:4000/v1/signos/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Usuario registrado exitosamente') {
                alert(data.message);
                goTo('/'); // Redirigir a la página principal después del registro
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert('Error de conexión');
        });
    };

    const handleGoBack = () => {
        goTo('/');
    };

    return (
        <form onSubmit={handleRegister}>
            <h1 id="txtBienvenida">Registro de usuario</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />

            <div className="inline-buttons">
                <input type="submit" value="Registrar" id="btnEnviar" />
                <button type="button" onClick={handleGoBack} id="btnVolver">
                    Volver
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;
