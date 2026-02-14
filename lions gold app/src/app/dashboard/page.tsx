import React from 'react';

export default function Dashboard() {
  // Datos simulados del usuario conectado
  const user = {
    username: "LionsCabo",
    albionName: "CaboGold_VZLA",
    rating: 4.85,
    totalTrades: 124,
    completionRate: "98.5%",
    silverEarned: "450,000,000",
    status: "Verificado"
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header del Panel */}
      <div className="max-w-6xl mx-auto flex justify-between items-end mb-8">
        <div>
          <p className="text-yellow-500 font-bold uppercase tracking-widest text-xs">Panel de Comerciante</p>
          <h1 className="text-4xl font-extrabold">{user.username} <span className="text-sm font-normal text-slate-500">({user.albionName})</span></h1>
        </div>
        <div className="bg-green-900/30 border border-green-500 text-green-500 px-4 py-1 rounded-full text-xs font-bold">
          ● {user.status}
        </div>
      </div>

      {/* Tarjetas de Estadísticas (Estilo Exchange) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">Rating de Confianza</p>
          <p className="text-3xl font-bold text-yellow-500">⭐ {user.rating}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">Trades Completados</p>
          <p className="text-3xl font-bold">{user.totalTrades}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">% de Finalización</p>
          <p className="text-3xl font-bold text-blue-400">{user.completionRate}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">Silver Transado</p>
          <p className="text-3xl font-bold text-green-500">{user.silverEarned}</p>
        </div>
      </div>

      {/* Sección Inferior: Historial y Seguridad */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Historial Reciente */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4">Últimos Intercambios</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-slate-900 rounded-lg border-l-4 border-green-500">
                <div>
                  <p className="font-bold">Venta de Oso Gigante T8</p>
                  <p className="text-xs text-slate-500">Comprador: Player_X | Hace 2 horas</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-mono">+8,500,000 S</p>
                  <p className="text-[10px] text-slate-600 italic">Comisión 0.06% aplicada</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centro de Seguridad y Reportes */}
        <div className="bg-slate-800 rounded-xl p-6 border border-red-900/30">
          <h2 className="text-xl font-bold mb-4 text-red-500">Centro de Seguridad</h2>
          <button className="w-full bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-600/50 py-3 rounded-lg font-bold transition-all mb-4">
            REPORTAR INTENTO DE ESTAFA
          </button>
          <div className="text-sm text-slate-400 space-y-2">
            <p className="flex justify-between"><span>Reportes recibidos:</span> <span className="text-white">0</span></p>
            <p className="flex justify-between"><span>Límite de Silver seguro:</span> <span className="text-yellow-500">100M / día</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}
