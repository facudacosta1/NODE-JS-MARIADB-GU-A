# GUÍA BASICA DE NODE JS Y MARIA DB

## Ejecutar app.js en terminal de node

**node app.js** ------> en la terminal de node o en la terminal de VS Code (aveces no funciona)

## Inicializar un servidor

**npm init**    ------> para crear servidor en node y crea package.json

Una vez creado el archivo package.json en la propiedad script podemos crear nuestros modulos.

## Instalación de express

**npm install express** --> Instala el módulo express

Crea una carpeta node_modules y el archivo package-lock.json

## Utilizar express: en app.js

**const express = require('express')** --> indica que usaremos express
**const app = express()** ---------------> instancia de express

## Crear puerto para escucha de peticiones

**const puerto = 3000** -----------------> para definir el puerto que usaré

## Crear endpoints (creando API de escucha de solicitudes)

Utilizamos postman para probar los servidores.
Usamos mockaroo o creamos un json con la data.
Para usar esa data:

let personas = require('./api/datos.json')

app.get('/', (request, response)=>{ --> indica que pasara cuando se realice una peticion a **http://localhost:3000**
    response.send ('<h1>Bienvenido</h1>');
}) 

Para indicar que hará el servidor al 

app.listen(puerto, ()=> {
    console.log('Servidor funcionando');
})

Para solicitar el listado de personas (data):

app.get('/listado', (req, res)=>{   --> Creando api para obtener listado de personas
    res.json(personas);
})

Para obtener una persona (utilizamos **parametros**)

app.get('/listado/:id', (req, res)=>{   --> Creando api para obtener una persona en especifico
    res.json(personas[req.params.id]);
})