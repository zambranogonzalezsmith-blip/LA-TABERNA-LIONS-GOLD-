// Simulación de base de datos P2P para LIONS-GOLD
const marketData = [
    { item: "Battleaxe T8", price: "500k Silver", seller: "SCARFACE-LG", status: "Disponible" },
    { item: "Swiftclaw", price: "120k Silver", seller: "ARRANCA-TANGAS", status: "Vendido" }
];

function cargarMercado() {
    const container = document.getElementById('offers-list');
    container.innerHTML = marketData.map(offer => `
        <div class="card ${offer.status.toLowerCase()}">
            <h3>${offer.item}</h3>
            <p>Precio: <strong>${offer.price}</strong></p>
            <p>Vendedor: ${offer.seller}</p>
            <span class="badge">${offer.status}</span>
            <button onclick="contactar()">Comprar P2P</button>
        </div>
    `).join('');
}

function contactar() {
    alert("Iniciando protocolo de intercambio seguro vía Telegram/Discord...");
}

window.onload = cargarMercado;
