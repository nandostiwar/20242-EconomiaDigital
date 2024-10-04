const fs = require('fs/promises');
const path = require('path');

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    // Leer las credenciales actuales
    const credencialesPath = path.join(__dirname, '../../db/credenciales.json');
    const credencialesData = await fs.readFile(credencialesPath);
    const credenciales = JSON.parse(credencialesData);

    // Verificar si el usuario ya existe
    if (credenciales[username]) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Agregar nuevo usuario
    credenciales[username] = { password };

    // Guardar el nuevo usuario en el archivo
    await fs.writeFile(credencialesPath, JSON.stringify(credenciales, null, 2), { encoding: 'utf-8' });

    res.json({ message: 'Usuario registrado exitosamente' });
};

// Función para restablecer la contraseña
const resetPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    // Leer las credenciales actuales
    const credencialesPath = path.join(__dirname, '../../db/credenciales.json');
    const credencialesData = await fs.readFile(credencialesPath);
    const credenciales = JSON.parse(credencialesData);

    // Verificar si el usuario existe
    if (!credenciales[username]) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar la contraseña
    credenciales[username].password = newPassword;

    // Guardar las credenciales actualizadas
    await fs.writeFile(credencialesPath, JSON.stringify(credenciales, null, 2), { encoding: 'utf-8' });

    res.json({ message: 'Contraseña actualizada exitosamente' });
};

module.exports = {
    registerUser,
    resetPassword,
};
