const express = require('express');
const router = require('../routes/routes.js');
const {urlencoded, json} = require('express');
const cors = require('cors');
const app = express();

app.use(urlencoded({extended: true}));
app.use(json());
app.use(cors());

app.use('/api/action', router);

app.post('/api/action/Ascendente', (req, res) => {
    const { numbers } = req.body;

    if (!numbers || !Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Se requiere un array de números.' });
    }
    const sortedNumbers = numbers.sort((a, b) => a - b);
    res.json({ sortedNumbers });
});

app.post('/api/action/Descendente', (req, res) => {
    const { Numbers } = req.body;

    if (!Numbers || !Array.isArray(Numbers)) {
        return res.status(400).json({ error: 'Se requiere un array de números.' });
    }

    const sortedNumbers = Numbers.sort((a, b) => b - a);
    res.json({ sortedNumbers });
});


app.set("port",8000);
app.listen(app.get("port"), ()=>{
    console.log("Listening at port 8000");
});

