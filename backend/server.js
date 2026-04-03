const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// CONFIGURACIÓN TÁCTICA DE CORS (Abre el perímetro para local)
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-admin-token']
}));

app.use(bodyParser.json());

// --- BASE DE DATOS ---
const db = new sqlite3.Database('./lions_gold.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        reputation INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        last_item TEXT,
        last_amount REAL DEFAULT 0,
        last_location TEXT,
        last_fee REAL DEFAULT 0
    )`);
});

// --- RUTA DE TEST (Para verificar conexión) ---
app.get('/api/ping', (req, res) => res.json({ status: "Operativo", mensaje: "Conexión establecida con el servidor" }));

// --- RESTO DE RUTAS ---
app.post('/api/trades', (req, res) => {
    const { seller, amount, item, location, fee } = req.body;
    const sql = `INSERT INTO users (username, last_item, last_amount, last_location, last_fee)
                 VALUES (?, ?, ?, ?, ?)
                 ON CONFLICT(username) DO UPDATE SET
                 last_item=excluded.last_item, last_amount=excluded.last_amount, 
                 last_location=excluded.last_location, last_fee=excluded.last_fee`;

    db.run(sql, [seller, item, amount, location, fee], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Transacción Registrada" });
    });
});

app.get('/api/admin/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(PORT, () => console.log(`🚀 Servidor LIONS-GOLD en puerto ${PORT}`));
