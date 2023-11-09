console.log('hola mundo');
const express = require('express');
const app = express();
const puerto = 3000;

let personas = require('./api/datos.json')

app.get('/', (request, response) => { 
    response.send('<h1>Bienvenido a mi servidor</h1>');
}) 

app.listen(puerto, () => {
    console.log('Servidor funcionando');
});

app.get('/listado', (request, response)=>{
    response.json(personas);
})

app.get('/listado/:id', (req, res)=>{  
    res.json(personas[req.params.id]);
})