
const express = require('express');
const {  db } = require('../database/config');
require('dotenv').config();
const cors = require('cors');
const serverless = require("serverless-http");

// console.log(process.env.PORT)

//Crear servidor de express

const app = express();

async function dbConnection(){
    try {

        await db.authenticate();
        console.log("DB online")

    } catch (error) {
        console.error('Error',error)
        // throw new Error(error);
    }
}

app.use(cors());
// Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/.netlify/functions/index', require('../routes/auth'));
// app.use('/.netlify/functions/app/api/auth', require('../routes/auth'));



app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    dbConnection();
});

module.exports.handler = serverless(app);
