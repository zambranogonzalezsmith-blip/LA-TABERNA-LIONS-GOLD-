const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const ADMIN_TOKEN = "TU_CLAVE_DE_MANDO_AQUI"; // Define tu clave aquí

app.use(cors());
app.use(bodyParser.json());

// --- INICIALIZACIÓN DE LA BASE DE DATOS TÁCTICA ---
const db = new sqlite3.Database('./lions_gold.db', (err) => {
    if (err) console.error("Error al conectar con la DB:", err);
    console.log("Conectado a la Base de Datos Lions-Gold.");
});

// Creamos/Actualizamos las tablas para los nuevos parámetros
db.serialize(() => {
    // Tabla de Usuarios y Reputación
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

    // Tabla de Historial de Trades (Opcional para auditoría)
    db.run(`CREATE TABLE IF NOT EXISTS trades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seller TEXT,
        amount REAL,
        item TEXT,
        location TEXT,
        fee REAL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// --- RUTAS PÚBLICAS (MERCADO) ---

app.post('/api/trades', (req, res) => {
    const { seller, amount, item, location, description, fee } = req.body;

    // 1. Verificar si el usuario está en la Blacklist primero
    db.get("SELECT status FROM users WHERE username = ?", [seller], (err, row) => {
        if (row && row.status === 'blacklisted') {
            return res.status(403).json({ error: "USUARIO EN BLACKLIST" });
        }

        // 2. Registrar el trade y actualizar el estado del usuario en el censo
        const sqlUpdateUser = `
            INSERT INTO users (username, last_item, last_amount, last_location, last_fee)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(username) DO UPDATE SET
            last_item = excluded.last_item,
            last_amount = excluded.last_amount,
            last_location = excluded.last_location,
            last_fee = excluded.last_fee;
        `;

        db.run(sqlUpdateUser, [seller, item, amount, location, fee], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Operación registrada en el sistema." });
        });
    });
});

// --- RUTAS DE MANDO (ADMIN) ---

// Middleware de seguridad
const authAdmin = (req, res, next) => {
    const token = req.headers['x-admin-token'];
    if (token === ADMIN_TOKEN) next();
    else res.status(401).json({ error: "ACCESO NO AUTORIZADO" });
};

// Obtener todos los usuarios para el Radar
app.get('/api/admin/users', authAdmin, (req, res) => {
    db.all("SELECT * FROM users ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Actualizar Reputación (Promover)
app.post('/api/admin/reputation', authAdmin, (req, res) => {
    const { username, points } = req.body;
    db.run("UPDATE users SET reputation = reputation + ? WHERE username = ?", [points, username], (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Reputación actualizada." });
    });
});

// Protocolo Disciplinario (Banear/Perdonar)
app.post('/api/admin/update-status', authAdmin, (req, res) => {
    const { username, newStatus } = req.body;
    db.run("UPDATE users SET status = ? WHERE username = ?", [newStatus, username], (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Estatus actualizado en el censo." });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor de LIONS-GOLD operativo en http://localhost:${PORT}`);
});
