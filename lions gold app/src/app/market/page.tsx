import React from 'react';

export default function Register() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700">
        
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500 mb-2">ÚNETE A LA TABERNA</h1>
          <p className="text-slate-400 text-sm">Registro de Comerciante Lions-Gold</p>
        </div>

        <form className="space-y-6">
          {/* Nombre del Personaje en Albion */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nombre de Personaje (IGN)
            </label>
            <input 
              type="text" 
              placeholder="Ej: LionsCabo" 
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              required
            />
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">
              * Debe coincidir exactamente con el nombre in-game para reportes.
            </p>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              placeholder="tu@correo.com" 
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              required
            />
          </div>

          {/* Botón de Registro */}
          <button 
            type="submit" 
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-lg shadow-lg transform active:scale-95 transition-all"
          >
            VERIFICAR CUENTA Y REGISTRAR
          </button>
        </form>

        {/* Nota de Seguridad */}
        <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-yellow-900/30">
          <p className="text-[11px] text-slate-400 text-center">
            🔒 Al registrarte, aceptas que tu reputación sea pública. Los intentos de estafa resultarán en un baneo permanente de la plataforma.
          </p>
        </div>

      </div>
    </div>
  );
}

const playSaleSound = () => {
  const audio = new Audio('/sounds/kaching.mp3');
  audio.play();
}
