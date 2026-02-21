import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pokemon'
});

db.connect(err => {
    if (err) {
        console.error('❌ Error al conectar a MySQL:', err);
    } else {
        console.log('✅ Conectado a MySQL');
    }
});

app.post('/api/guardar', (req, res) => {
    const { nombre, pokemones } = req.body;

    if (!nombre || !pokemones) {
        return res.json({ success: false, message: "Datos incompletos" });
    }

    const sql = 'INSERT INTO equipos (nombre, pokemones) VALUES (?, ?)';
    db.query(sql, [nombre, JSON.stringify(pokemones)], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true, id: result.insertId });
    });
});

app.get('/api/listado', (req, res) => {
    db.query('SELECT * FROM equipos', (err, results) => {
        if (err) return res.status(500).json({ success: false, error: err });
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`... Servidor corriendo en http://localhost:${PORT}`);
});
