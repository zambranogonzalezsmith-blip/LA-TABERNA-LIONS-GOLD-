const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Configuración de CORSA abierta para desarrollo local
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-admin-token']
}));

app.use(bodyParser.json());

// --- BASE DE DATOS LIONS-GOLD ---
const db = new sqlite3.Database('./lions_gold.db', (err) => {
    if (err) console.error("❌ Error al abrir DB:", err.message);
    else console.log("🗄️ Base de datos conectada.");
});

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

// --- RUTA DE REGISTRO DE TRADES ---
app.post('/api/trades', (req, res) => {
    const { seller, amount, item, location, fee } = req.body;
    
    // Log de auditoría en la terminal
    console.log(`📡 Intento de registro: [${seller}] - ${amount} Silver - ${location}`);

    const sql = `INSERT INTO users (username, last_item, last_amount, last_location, last_fee)
                 VALUES (?, ?, ?, ?, ?)
                 ON CONFLICT(username) DO UPDATE SET
                 last_item=excluded.last_item, 
                 last_amount=excluded.last_amount, 
                 last_location=excluded.last_location, 
                 last_fee=excluded.last_fee`;

    db.run(sql, [seller, item, amount, location, fee], function(err) {
        if (err) {
            console.error("❌ Error en DB:", err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log(`✅ Trade confirmado para: ${seller}`);
        res.json({ message: "Transacción Registrada con éxito." });
    });
});

// --- RUTA PARA EL RADAR ADMIN ---
app.get('/api/admin/users', (req, res) => {
    db.all("SELECT * FROM users ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 COMANDO CENTRAL OPERATIVO`);
    console.log(`📍 URL: http://127.0.0.1:${PORT}`);
    console.log(`-----------------------------------------`);
});
