import React from 'react';

// Simulamos los datos que vendrían de la base de datos (Prisma)
const items = [
  { id: 1, name: "Swiftclaw", category: "Mount", tier: "T5", price: "180,000", city: "Fort Sterling", seller: "LionsCabo", rating: 4.9 },
  { id: 2, name: "Carleon Caerleon Cape", category: "Accessory", tier: "T8.3", price: "4,500,000", city: "Caerleon", seller: "GoldTrader", rating: 5.0 },
  { id: 3, name: "Elder's Battleaxe", category: "Weapon", tier: "T8", price: "1,200,000", city: "Martlock", seller: "SilverKing", rating: 4.7 },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* Encabezado Estilo Exchange */}
      <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
        <h1 className="text-3xl font-bold text-yellow-500">LA TABERNA LIONS-GOLD</h1>
        <div className="text-sm text-slate-400">Comisión fija: <span className="text-green-400">0.06%</span></div>
      </header>

      {/* Filtros Rápidos */}
      <div className="flex gap-4 mb-6">
        <button className="bg-slate-800 px-4 py-2 rounded hover:bg-slate-700">⚔️ Armas</button>
        <button className="bg-slate-800 px-4 py-2 rounded hover:bg-slate-700">🐎 Monturas</button>
        <button className="bg-slate-800 px-4 py-2 rounded hover:bg-slate-700">💎 Materiales</button>
      </div>

      {/* Tabla de Comercio P2P */}
      <div className="bg-slate-800 rounded-lg overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-700 text-slate-300 uppercase text-xs">
            <tr>
              <th className="p-4">Ítem</th>
              <th className="p-4">Tier</th>
              <th className="p-4">Precio (Silver)</th>
              <th className="p-4">Ciudad</th>
              <th className="p-4">Vendedor (Confianza)</th>
              <th className="p-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-750 transition-colors">
                <td className="p-4 font-semibold">{item.name}</td>
                <td className="p-4"><span className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-xs">{item.tier}</span></td>
                <td className="p-4 text-yellow-400 font-mono">{item.price}</td>
                <td className="p-4 text-slate-300">{item.city}</td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span>{item.seller}</span>
                    <span className="text-xs text-yellow-600">⭐ {item.rating}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold text-sm">
                    COMPRAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Informativo */}
      <footer className="mt-8 text-slate-500 text-xs text-center">
        Protección Anti-Scam activa. Todas las transacciones son verificadas vía Email.
      </footer>
    </div>
  );
}
