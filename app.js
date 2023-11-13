const express = require('express');
const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: "localhost", user: "root", password: "admin", database: "pruebadb", connectionLimit: 5 });
const app = express();
const puerto = 3000;

let personas = require('./api/datos.json');
app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

app.get('/', (req, res) => {
    res.send('<h1>Bienvenido a mi servidor</h1>');
})

app.listen(puerto, () => {
    console.log(`Servidor funcionando en el puerto ${puerto}`);
});

//CRUD: CREATE, READ, UPDATE, DELETE.

//PETICIÓN GET
app.get('/listado', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT id, name, lastname, email FROM people");
        res.json(rows); // Corregir aquí
    } catch (error) {
        res.status(500).json({ message: "No se pudo realizar la consulta" });
    }
    finally {
        if (conn) conn.release(); // release to pool
    }
});

//Parámetro de petición
app.get('/listado/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT id, name, lastname, email FROM people WHERE id = ?", [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "No se pudo realizar la consulta" });
    }
    finally {
        if (conn) conn.release(); //release to pool
    }
})

//PETICIÓN POST
app.post("/listado", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query("INSERT INTO people(name,lastname,email) VALUE(?,?,?)", [req.body.name, req.body.lastname, req.body.email]);
        res.json({id: parseInt(response.insertId), ...req.body});
    } catch (error) {
        res.status(500).json({ message: "No se pudo realizar la consulta" });
    }
    finally {
        if (conn) conn.release(); //release to pool
    }
});


//PETICIÓN PUT
app.put('/listado/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query("UPDATE people SET name=?, lastname=?, email=? WHERE id=?", [req.body.name, req.body.lastname, req.body.email, req.params.id]);
        res.json({id: req.params.id, ...req.body});
    } catch (error) {
        res.status(500).json({ message: "No se pudo realizar la consulta" });
    }
    finally {
        if (conn) conn.release(); //release to pool
    }
});


//PETICION DELETE
app.delete('/listado/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query("DELETE FROM people WHERE id = ?", [req.params.id]); 
        res.json({message: "Elemento borrado correctamente"});
    } catch (error) {
        res.status(500).json({ message: "No se pudo realizar la consulta" });
    }
    finally {
        if (conn) conn.release(); // release to pool
    }
});
