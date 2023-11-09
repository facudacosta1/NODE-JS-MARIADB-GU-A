const express = require('express');
const app = express();
const puerto = 3000;

let personas = require('./api/datos.json');
app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

app.get('/', (request, response) => { 
    response.send('<h1>Bienvenido a mi servidor</h1>');
}) 

app.listen(puerto, () => {
    console.log(`Servidor funcionando en el puerto ${puerto}`);
});

//CRUD: CREATE, READ, UPDATE, DELETE.

//PETICIÓN GET
app.get('/listado', (request, response)=>{
    response.json(personas);
})

//Parámetro de petición
app.get('/listado/:index', (req, res)=>{  
    res.json(personas[req.params.index]);
})

//PETICIÓN POST
app.post("/listado", (req, res) => {
    personas.push(req.body); 
    res.json(req.body); 
});

//PETICIÓN PUT
app.put('/listado/:index', (req, res) => {
    personas[req.params.index] = req.body;
    res.json(personas[req.params.index]);
});

//PETICION DELETE
app.delete('/listado/:index', (req,res)=>{
    let index = req.params.index;
    const deletedPerson = personas.splice(index,1);
    res.json(deletedPerson[0]);
})

