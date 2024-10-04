const fs = require('fs/promises');
const path = require('path');

// Función para validar el inicio de sesión
const calculeLogin = async (req, res) => {
    const { username, password } = req.body;

    // Leer el archivo de credenciales
    const credencialesPath = path.join(__dirname, '../../db/credenciales.json');
    const credencialesData = await fs.readFile(credencialesPath);
    const credenciales = JSON.parse(credencialesData);

    // Verificar si el usuario existe
    if (!credenciales[username]) {
        return res.status(401).json({ resultado: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es correcta
    if (credenciales[username].password !== password) {
        return res.status(401).json({ resultado: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas, devolver el rol
    if (username === 'admin') {
        return res.json({ resultado: 'admin' });
    } else {
        return res.json({ resultado: 'user' });
    }
};

const getAllSignos = async (req, res)=>{
    const signo = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const getOneSigno = async (req, res)=>{
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)
}

const updateSigno = async (req, res)=>{
    const signoEditar = req.params.signoEditar;
    const {textoEditar} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    calculeLogin
}