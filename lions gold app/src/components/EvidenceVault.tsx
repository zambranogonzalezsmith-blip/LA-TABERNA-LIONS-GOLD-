import React, { useState } from 'react';

export default function EvidenceVault({ tradeId }: { tradeId: string }) {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Simulación de subida de imagen
  const handleUpload = () => {
    setUploading(true);
    // Aquí iría la lógica para enviar a tu servidor o a un servicio como Imgur/Cloudinary
    setTimeout(() => {
      setUploading(false);
      alert("Evidencia guardada. El equipo de Lions-Gold revisará el trade.");
    }, 2000);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border-2 border-dashed border-slate-600">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
        🛡️ Bóveda de Evidencias (Trade: {tradeId})
      </h3>
      
      <p className="text-slate-400 text-sm mb-4">
        Para liberar el pago, sube una captura de pantalla del registro de trade in-game. 
        Asegúrate de que se vea el nombre de ambos personajes y la cantidad de Silver/Ítems.
      </p>

      <div className="flex flex-col items-center justify-center">
        {!image ? (
          <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-6 py-4 rounded-lg transition-all w-full text-center">
            <span>📷 Seleccionar Captura de Pantalla</span>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => setImage(URL.createObjectURL(e.target.files![0]))}
            />
          </label>
        ) : (
          <div className="w-full">
            <img src={image} alt="Evidencia" className="rounded-lg mb-4 max-h-64 mx-auto" />
            <div className="flex gap-2">
              <button 
                onClick={() => setImage(null)}
                className="flex-1 bg-red-600/20 text-red-500 py-2 rounded-lg text-sm"
              >
                Eliminar
              </button>
              <button 
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-sm font-bold"
              >
                {uploading ? "Subiendo..." : "Confirmar Entrega"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-500/30">
        <p className="text-[10px] text-blue-300">
          ⚠️ Nota: Mentir en la evidencia resultará en baneo permanente y pérdida de los fondos en custodia.
        </p>
      </div>
    </div>
  );
}
