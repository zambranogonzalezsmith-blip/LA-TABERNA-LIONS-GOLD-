import React from 'react';

// Datos de ejemplo que vendrían de los reportes confirmados por ti
const scammers = [
  { id: "1", albionName: "RataDelPantano99", reason: "Falsa evidencia de pago", date: "2026-02-10", status: "Baneado Permanente" },
  { id: "2", albionName: "SilverThief_01", reason: "Intento de phishing", date: "2026-02-12", status: "Baneado Permanente" },
  { id: "3", albionName: "ShadowGamerVZ", reason: "Incumplimiento de trade P2P", date: "2026-02-14", status: "Bajo Investigación" },
];

export default function Blacklist() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado de Advertencia */}
        <div className="bg-red-900/20 border border-red-600 p-6 rounded-xl mb-8 text-center">
          <h1 className="text-4xl font-black text-red-500 mb-2 italic">EL MURO DE LA VERGÜENZA</h1>
          <p className="text-slate-300 font-medium">
            Usuarios expulsados de La Taberna por intentos de estafa o mal comportamiento.
          </p>
          <p className="text-xs text-red-400 mt-2 uppercase tracking-tighter">
            No realices trades in-game con estos personajes bajo ninguna circunstancia.
          </p>
        </div>

        {/* Tabla de Expulsados */}
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
          <table className="w-full text-left">
            <thead className="bg-slate-700 text-slate-400 text-xs uppercase">
              <tr>
                <th className="p-4">Personaje (Albion)</th>
                <th className="p-4">Motivo del Ban</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {scammers.map((scammer) => (
                <tr key={scammer.id} className="hover:bg-red-900/10 transition-colors">
                  <td className="p-4 font-bold text-red-400">{scammer.albionName}</td>
                  <td className="p-4 text-sm text-slate-300">{scammer.reason}</td>
                  <td className="p-4 text-sm text-slate-500">{scammer.date}</td>
                  <td className="p-4">
                    <span className="bg-red-600/20 text-red-500 px-2 py-1 rounded-md text-[10px] font-bold border border-red-500/50">
                      {scammer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón de Reporte */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm mb-4">¿Fuiste víctima de alguien que no está en la lista?</p>
          <button className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-slate-200 transition-all">
            ENVIAR REPORTE A MODERACIÓN
          </button>
        </div>

      </div>
    </div>
  );
}
