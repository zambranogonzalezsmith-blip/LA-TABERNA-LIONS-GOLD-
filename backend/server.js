const express = require('express');
const cors = require('cors'); // Vital para permitir la conexión desde GitHub
const app = express();

app.use(cors());
app.use(express.json());

// Ruta para recibir el trade desde el frontend
app.post('/api/trades', (req, res) => {
    const nuevoTrade = req.body;
    console.log("Recibido en LIONS-GOLD Server:", nuevoTrade);
    
    // Aquí conectarías con tu database/schema.sql
    // Por ahora, devolvemos éxito
    res.status(201).json({ message: "Trade registrado en el servidor", id: nuevoTrade.id });
});

app.listen(3000, () => console.log("Servidor LIONS-GOLD activo en puerto 3000"));
