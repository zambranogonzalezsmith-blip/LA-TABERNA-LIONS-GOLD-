// CLAVE DE MANDO CENTRAL (Cámbiala por una segura)
const ADMIN_TOKEN = "LG_CARACAS_2026_X7";
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- RUTA TÁCTICA A LA BASE DE DATOS ---
const dbPath = path.join(__dirname, 'database', 'lions_gold.db');
const schemaPath = path.join(__dirname, 'database', 'schema.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('❌ Error DB:', err.message);
    else console.log('📂 Base de Datos LIONS-GOLD conectada en /database');
});

// --- INICIALIZACIÓN AUTOMÁTICA DEL ESQUEMA ---
const initSql = fs.readFileSync(schemaPath).toString();
db.exec(initSql, (err) => {
    if (err) console.error('❌ Error en Schema:', err.message);
    else console.log('🛡️ Estructura de Tablas (Users, Offers, Blacklist) Validada.');
});

// --- MIDDLEWARE: MURO DE LA VERGÜENZA ---
const checkBlacklist = (req, res, next) => {
    const { seller } = req.body;
    db.get("SELECT status FROM users WHERE username = ?", [seller], (err, row) => {
        if (row && row.status === 'blacklisted') {
            console.log(`🚫 BLOQUEO: Intento de acceso de usuario baneado: ${seller}`);
            return res.status(403).json({ error: "ACCESO DENEGADO: Usuario en Blacklist de LIONS-GOLD." });
        }
        next();
    });
};

// --- RUTA DE REGISTRO DE TRADES (Protegida) ---
app.post('/api/trades', checkBlacklist, (req, res) => {
    const { id, seller, amount, fee, status } = req.body;

    // 1. Asegurar que el usuario existe o crearlo
    db.run("INSERT OR IGNORE INTO users (username) VALUES (?)", [seller], (err) => {
        
        // 2. Insertar la oferta vinculada al usuario
        const query = `
            INSERT INTO offers (item_name, amount, price_usdt, fee_applied, status, seller_id)
            SELECT 'Silver/P2P', ?, ?, ?, ?, id FROM users WHERE username = ?`;

        db.run(query, [amount, amount, fee, status, seller], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Trade Sincronizado", tradeId: id });
        });
    });
});

app.listen(3000, () => console.log("🚀 Servidor LIONS-GOLD en puerto 3000"));
// --- RUTA: OBTENER TODOS LOS USUARIOS (Para el Panel) ---
app.get('/api/admin/users', (req, res) => {
    db.all("SELECT id, username, reputation, status FROM users ORDER BY reputation DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- RUTA: CAMBIAR STATUS (Banear/Activar) ---
app.post('/api/admin/update-status', (req, res) => {
    const { username, newStatus, reason } = req.body;

    db.run("UPDATE users SET status = ? WHERE username = ?", [newStatus, username], function(err) {
        if (err) return res.status(500).json({ error: err.message });

        // Si es un baneo, registrar en la tabla Blacklist formalmente
        if (newStatus === 'blacklisted') {
            db.run(`INSERT INTO blacklist (bad_user_id, reason) 
                    SELECT id, ? FROM users WHERE username = ?`, [reason || 'Violación de términos P2P', username]);
        }
        
        console.log(`🛡️ SEGURIDAD: Usuario ${username} actualizado a ${newStatus}`);
        res.json({ message: `Estado de ${username} actualizado a ${newStatus}` });
    });
});

// --- RUTA: AJUSTAR REPUTACIÓN ---
app.post('/api/admin/reputation', (req, res) => {
    const { username, points } = req.body;
    db.run("UPDATE users SET reputation = reputation + ? WHERE username = ?", [points, username], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Reputación actualizada" });
    });
});
