import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 leading-relaxed">
      <div className="max-w-3xl mx-auto bg-slate-800 p-10 rounded-2xl border border-slate-700 shadow-2xl">
        <h1 className="text-3xl font-black text-yellow-500 mb-6 border-b border-yellow-500/20 pb-4">
          REGLAMENTO DE LA TABERNA
        </h1>
        
        <div className="space-y-6 text-slate-300 text-sm">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. La Naturaleza del Servicio</h2>
            <p>
              La Taberna Lions-Gold actúa únicamente como un <strong>intermediario tecnológico</strong> (Escrow) entre usuarios. No somos dueños del Silver ni de los ítems intercambiados en Albion Online.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Comisión de Mantenimiento (0.06%)</h2>
            <p>
              Por cada transacción exitosa, la plataforma retendrá automáticamente el <strong>0.06%</strong> del monto total. Esta tasa cubre la seguridad del servidor y el soporte en disputas. Una vez procesada, la comisión no es reembolsable.
            </p>
          </section>

          <section className="bg-red-900/10 p-4 rounded-lg border border-red-900/30">
            <h2 className="text-lg font-bold text-red-400 mb-2">3. Política Anti-Estafa y Muro de la Vergüenza</h2>
            <p>
              Cualquier intento de manipular evidencias de pago, suplantar identidad o engañar a otro comerciante resultará en:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Bloqueo permanente del nombre de usuario y correo electrónico.</li>
              <li>Publicación del nombre del personaje en el <strong>Muro de la Vergüenza</strong>.</li>
              <li>Pérdida de cualquier saldo en custodia a favor de la parte afectada.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Límites de Seguridad (Anti-Ban)</h2>
            <p>
              Para proteger las cuentas de nuestros usuarios de los sistemas de detección de Albion Online, la plataforma impone límites diarios de transferencia. Superar estos límites sin autorización previa marca la transacción como <strong>"Alto Riesgo"</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Jurisdicción y Validez</h2>
            <p>
              Como bien sabes, cualquier documento que llegue a un tribunal es totalmente legal si cumple con las normativas vigentes. Lions-Gold se rige por la transparencia y la fe pública en los intercambios.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700 text-center text-[10px] text-slate-500 uppercase tracking-widest">
          Lions-Gold App 2026 - Protegiendo el Comercio en el Pantano
        </div>
      </div>
    </div>
  );
}
