// CONFIGURACIÓN CENTRAL
const API_URL = 'http://localhost:3000/api/trades'; 

// --- CÁLCULO DE COMISIÓN (0.06%) ---
function calculateFee() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const fee = amount * 0.0006;
    document.getElementById('fee-amount').innerText = fee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
}

// --- CREAR Y SINCRONIZAR TRADE ---
async function createTrade() {
    const seller = document.getElementById('sellerName').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!seller || !amount || amount <= 0) {
        return alert("⚠️ ERROR: Datos insuficientes para la operación.");
    }

    const fee = amount * 0.0006;
    const tradeId = 'LG-' + Math.random().toString(36).substr(2, 5).toUpperCase();

    const newTrade = {
        id: tradeId,
        seller: seller,
        amount: amount,
        fee: fee,
        status: 'Sincronizando...',
        timestamp: new Date().toISOString()
    };

    // 1. Guardar localmente (Seguridad de datos inmediata)
    saveToLocal(newTrade);
    renderTrades();

    // 2. ACTUALIZACIÓN AL SERVIDOR (Fetch)
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTrade)
        });

        if (response.ok) {
            updateTradeStatus(tradeId, 'Completado');
            alert(`✅ Operación ${tradeId} validada por el servidor central.`);
        } else {
            throw new Error("Servidor no respondió correctamente");
        }
    } catch (error) {
        console.error("Error de sincronización:", error);
        updateTradeStatus(tradeId, 'Offline/Local');
        alert("⚠️ AVISO: Servidor central offline. Registro guardado en caché local.");
    }
}

// --- UTILIDADES ---
function saveToLocal(trade) {
    let history = JSON.parse(localStorage.getItem('lg_history')) || [];
    history.unshift(trade);
    localStorage.setItem('lg_history', JSON.stringify(history));
}

function updateTradeStatus(id, newStatus) {
    let history = JSON.parse(localStorage.getItem('lg_history')) || [];
    let trade = history.find(t => t.id === id);
    if (trade) trade.status = newStatus;
    localStorage.setItem('lg_history', JSON.stringify(history));
    renderTrades();
}

function renderTrades() {
    const container = document.getElementById('trades-container');
    const history = JSON.parse(localStorage.getItem('lg_history')) || [];
    
    container.innerHTML = history.map(t => `
        <div class="trade-card">
            <span class="trade-id">${t.id}</span>
            <span class="trade-seller">${t.seller}</span>
            <span class="trade-amount">${t.amount.toLocaleString()}</span>
            <span class="trade-status ${t.status.toLowerCase()}">${t.status}</span>
        </div>
    `).join('');
}

// Carga inicial
window.onload = renderTrades;
