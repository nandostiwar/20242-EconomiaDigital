const express = require('express');
const {urlencoded, json} = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const router = require('./routes/hotel.routes.js');
require("dotenv").config();

const app = express();

// Funcion de conexión a MongoDB Atlas en la nube
async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
}

// Ejecución de la función como una Promise
main().catch(console.error);

app.use(urlencoded({extended: true}));
app.use(json());
app.use(cors());

app.use('/v1/hotel', router);

app.listen(4700, ()=>{
    console.log("Listenin at port 4700");
});