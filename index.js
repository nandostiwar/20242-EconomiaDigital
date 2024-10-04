const express = require('express');
const { urlencoded, json } = require('express');
const cors = require('cors');
const router = require('./routes/signos.routes.js');
const authRouter = require('./routes/auth.routes.js'); // Nuevas rutas

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors());
app.use('/v1/signos', router);
app.use('/v1/auth', authRouter); // Nueva ruta para autenticación

app.listen(5000, () => {
    console.log('listening at port 5000');
});
