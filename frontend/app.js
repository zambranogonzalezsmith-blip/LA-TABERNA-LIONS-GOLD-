// --- CREAR TRADE Y SINCRONIZAR CON SERVER.JS ---
async function createTrade() {
    const seller = document.getElementById('sellerName').value.trim();
    const buyer = document.getElementById('buyerName').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;

    // 1. Validaciones Tácticas
    if(!seller || !buyer || !amount || amount <= 0) {
        return alert("⚠️ ERROR: Completa los datos de la transacción.");
    }

    if(db.blacklist.includes(seller) || db.blacklist.includes(buyer)) {
        return alert("⛔ SEGURIDAD: Usuario bloqueado detectado.");
    }

    const fee = amount * 0.0006;
    const tradeId = 'LG-' + Math.random().toString(36).substr(2, 5).toUpperCase();

    // 2. Definición del Objeto Trade
    const newTrade = {
        id: tradeId,
        seller,
        buyer,
        amount,
        fee,
        currency,
        status: 'Pendiente Evidencia',
        timestamp: new Date().toISOString() // Formato estándar para base de datos
    };

    // 3. Persistencia Local (Soberanía Inmediata)
    db.trades.unshift(newTrade);
    db.earnings += fee;
    saveDB();
    renderTrades();

    // 4. SINCRONIZACIÓN CON EL BACKEND (server.js)
    // Cambia 'http://localhost:3000' por tu URL de Render/Replit/Docker
    const API_URL = 'http://localhost:3000/api/trades'; 

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Aquí podrías añadir un Token de Seguridad en el futuro
            },
            body: JSON.stringify(newTrade),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Sincronizado con éxito:', data);
            alert(`✅ Operación ${newTrade.id} sincronizada con el servidor central LIONS-GOLD.`);
        } else {
            throw new Error('Respuesta del servidor no válida');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        // El trade ya se guardó localmente, así que el usuario no pierde la info
        alert("⚠️ AVISO: El servidor central está OFFLINE. El registro se guardó localmente en este dispositivo.");
    }

    // 5. Reset del Formulario
    document.getElementById('amount').value = '';
    calculatePreview();
}
