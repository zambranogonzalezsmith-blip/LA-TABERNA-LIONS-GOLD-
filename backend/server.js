const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const db = new sqlite3.Database('./database/albion_p2p.db');

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor P2P LIONS-GOLD Operativo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
