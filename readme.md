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

# Permitir que el servidor analice el cuerpo de las peticiones como JSON

**app.use(express.json());** ----> Permite que el servidor analice el cuerpo de las peticiones como JSON

# INSTALAR NODEMON PARA VER CAMBIOS SIN CERRAR EL SERVIDOR

**npm install nodemon** ---> instala nodemon y permite ver cambios sin cerrar servidor.

# REALIZANDO CRUD AL SERVIDOR (CRUD: CREATE, READ, UPDATE, DELETE a elementos de la base de dato)

Para solicitar el listado de personas (data):

## METODO GET:los datos de la petición se envían en el URL, util para READ, buscar información.
   
   
app.get('/listado', (req, res)=>{   --> Creando api para obtener listado de personas
    res.json(personas);
})

Para obtener una persona (utilizamos **parametros**)
La propiedad "params" del request permite acceder a los parámetros de la URL (importante no confundir con la "query", que serían los parámetros que se colocan  luego del signo "?" en la URL)

app.get('/listado/:id', (req, res)=>{   --> Creando api para obtener una persona en especifico
    res.json(personas[req.params.id]);
})

## METODO POST: los datos de la petición se envían en el cuerpo de la solicitud, mas seguro, datos no visibles en URL y por lo tanto sin restricciones de tamaño.

app.post("/listado", (req, res) => {            ---> app.post para solicitud post
    personas.push(req.body);                    ---> agregamos el dato al array personas
    res.json(req.body);                         ---> respondemos con el mismo dato agregado
});

**Para verificar en postman** --> hay que realizar una solicitud post, seleccionar body > raw > json y escribir el dato a enviar.

## METODO PUT: para actualizar los datos.

app.put('/listado/:index', (req, res) => {      ---> app.put par asolicitud put (actualizar)
    personas[req.params.index] = req.body;      --->toma el parametro para saber que actualizar y el body con el dat
    res.json(personas[req.params.index]);       --->responde con el dato 
});

En la peticion post se le debe agregar el indice al link (local:host/listado/0) y se le debe pasar el json completo, no se puede modificar solo una parte del json (ej solo id).

El dato json actualizado debe ir en el body de la peticion y en formato json.

## METODO DELETE. para eliminar un dato del array.

app.delete('/listado/:index', (req,res)=>{              ---> app.delete para peticion delete
    let index = req.params.index;                       ---> toma el index pasado en el link
    const deletedPerson = personas.splice(index,1);     ---> utiliza splice para eliminar el elemento del index
    res.json(deletedPerson[0]);                              utiliza parametros (index, 1): 1 indica cuantos element
})                                                           se eliminarán

Para probar si se eliminó se realiza peticion delete pasando el index en el link y luego realizando solicitud post para ver que el elemento que se encontraba en el indice del array ya no se encuentra (puede haber otro en su lugar porque se desliza)