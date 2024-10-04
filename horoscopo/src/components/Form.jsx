import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const validateUser = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/v1/signos/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.resultado === "success") {
                if (username === 'admin') {
                    callback("admin");
                    goTo("/adminHome");
                } else {
                    callback("user");
                    goTo("/userHome"); // Redirigir al menú del usuario
                }
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert('Error de conexión');
        });
    };

    const handleRegister = () => {
        goTo("/register");
    };

    const handleForgotPassword = () => {
        goTo("/reset-password");
    };

    return (
        <>
            <form onSubmit={validateUser}>
                <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
                <h4 className="txt">Nombre de Usuario</h4>
                <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
                <h4 className="txt">Contraseña</h4>
                <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />

                {/* Contenedor para los botones de Ingresar y Registrar */}
                <div className="inline-buttons">
                    <input type="submit" value="Ingresar" id="btnEnviar" />
                    <button type="button" onClick={handleRegister} id="btnRegister">
                        Registrar
                    </button>
                </div>
            </form>

            {/* Botón Olvidé mi contraseña */}
            <div className="button-container">
                <button type="button" onClick={handleForgotPassword} id="btnForgotPassword">
                    Olvidé mi contraseña
                </button>
            </div>
        </>
    );
}

export default Form;
