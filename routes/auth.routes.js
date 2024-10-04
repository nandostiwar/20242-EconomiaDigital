const express = require('express');
const authController = require('./controllers/authController.js');
const router = express.Router();

router.post('/register', authController.registerUser); // Ruta para registrar usuario
router.post('/reset-password', authController.resetPassword); // Ruta para restablecer contraseña

module.exports = router;
