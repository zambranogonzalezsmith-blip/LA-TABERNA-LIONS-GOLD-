// --- CONFIGURACIÓN DE SEGURIDAD LIONS-GOLD ---
const ADMIN_TOKEN = "LG"; 

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- CONEXIÓN A BASE DE DATOS ---
const dbPath = path.join(__dirname, 'database', 'lions_gold.db');
const schemaPath = path.join(__dirname, 'database', 'schema.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('❌ Error DB:', err.message);
    else console.log('📂 Base de Datos LIONS-GOLD conectada en /database');
});

// --- INICIALIZACIÓN DE TABLAS ---
const initSql = fs.readFileSync(schemaPath).toString();
db.exec(initSql, (err) => {
    if (err) console.error('❌ Error en Schema:', err.message);
    else console.log('🛡️ Estructura de Tablas Validada.');
});

// --- MIDDLEWARE: VALIDACIÓN DE RANGO (ADMIN) ---
const authAdmin = (req, res, next) => {
    const token = req.headers['x-admin-token'];
    if (token === ADMIN_TOKEN) {
        next();
    } else {
        console.log(`⚠️ ALERTA: Intento de acceso no autorizado desde IP: ${req.ip}`);
        res.status(401).json({ error: "ACCESO DENEGADO: Credenciales de Mando Inválidas." });
    }
};

// --- MIDDLEWARE: MURO DE LA VERGÜENZA (USUARIOS) ---
const checkBlacklist = (req, res, next) => {
    const { seller } = req.body;
    db.get("SELECT status FROM users WHERE username = ?", [seller], (err, row) => {
        if (row && row.status === 'blacklisted') {
            return res.status(403).json({ error: "USUARIO BLOQUEADO: Estás en la Blacklist de LIONS-GOLD." });
        }
        next();
    });
};

// --- RUTAS PÚBLICAS (MERCADO) ---

app.post('/api/trades', checkBlacklist, (req, res) => {
    const { id, seller, amount, fee, status } = req.body;
    db.run("INSERT OR IGNORE INTO users (username) VALUES (?)", [seller], (err) => {
        const query = `
            INSERT INTO offers (item_name, amount, price_usdt, fee_applied, status, seller_id)
            SELECT 'Silver/P2P', ?, ?, ?, ?, id FROM users WHERE username = ?`;
        db.run(query, [amount, amount, fee, status, seller], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Trade Sincronizado", tradeId: id });
        });
    });
});

// --- RUTAS DE ALTO MANDO (PROTEGIDAS CON TOKEN) ---

app.get('/api/admin/users', authAdmin, (req, res) => {
    db.all("SELECT id, username, reputation, status FROM users ORDER BY reputation DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/admin/update-status', authAdmin, (req, res) => {
    const { username, newStatus, reason } = req.body;
    db.run("UPDATE users SET status = ? WHERE username = ?", [newStatus, username], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (newStatus === 'blacklisted') {
            db.run(`INSERT INTO blacklist (bad_user_id, reason) 
                    SELECT id, ? FROM users WHERE username = ?`, [reason || 'Violación P2P', username]);
        }
        res.json({ message: `Usuario ${username} actualizado a ${newStatus}` });
    });
});

app.post('/api/admin/reputation', authAdmin, (req, res) => {
    const { username, points } = req.body;
    db.run("UPDATE users SET reputation = reputation + ? WHERE username = ?", [points, username], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Reputación actualizada correctamente." });
    });
});

// --- LANZAMIENTO ---
app.listen(3000, () => {
    console.log("-----------------------------------------");
    console.log("🚀 SERVIDOR LIONS-GOLD ACTIVO - PUERTO 3000");
    console.log("🛡️ PROTOCOLO DE SEGURIDAD: ACTIVADO");
    console.log("-----------------------------------------");
});
