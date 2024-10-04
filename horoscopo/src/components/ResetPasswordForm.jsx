import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPasswordForm() {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const goTo = useNavigate();

    const handleResetPassword = (event) => {
        event.preventDefault();

        fetch('http://localhost:4000/v1/signos/reset-password', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Contraseña restablecida exitosamente') {
                alert(data.message);
                goTo('/'); // Redirigir a la página principal después del éxito
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
        <form onSubmit={handleResetPassword}>
            <h1 id="txtBienvenida">Restablecer contraseña</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Nueva Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setNewPassword(e.target.value)} /><br />

            <div className="inline-buttons">
                <input type="submit" value="Restablecer Contraseña" id="btnEnviar" />
                <button type="button" onClick={handleGoBack} id="btnVolver">
                    Volver
                </button>
            </div>
        </form>
    );
}

export default ResetPasswordForm;
