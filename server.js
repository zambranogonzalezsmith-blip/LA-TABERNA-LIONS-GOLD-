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
const axios = require('axios'); // Asegúrate de tener axios instalado: npm install axios

// --- RADAR TÁCTICO DE ALBION ---
app.get('/api/verify-player/:name', async (req, res) => {
    const playerName = req.params.name;
    
    try {
        // Llamada oficial a la base de datos de Albion (GameInfo API)
        const response = await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${playerName}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        // La API de Albion devuelve listas de players y guilds. Buscamos el match exacto.
        const player = response.data.players.find(
            p => p.Name.toLowerCase() === playerName.toLowerCase()
        );

        if (player) {
            // Si el jugador existe, enviamos sus datos reales al Frontend
            res.json({ 
                found: true, 
                name: player.Name, 
                guild: player.GuildName || "SIN GREMIO",
                alliance: player.AllianceName || "SIN ALIANZA",
                killFame: player.KillFame 
            });
        } else {
            res.json({ found: false });
        }

    } catch (error) {
        console.error("⚠️ Error en conexión con Albion:", error.message);
        res.status(500).json({ error: "No se pudo sincronizar con la base de datos de Albion" });
    }
});
