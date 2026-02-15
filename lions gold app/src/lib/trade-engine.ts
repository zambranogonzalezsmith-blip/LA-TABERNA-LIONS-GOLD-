// Lógica del Motor de Intercambio Lions-Gold
export const processTrade = (amount: number, currency: 'SILVER' | 'USDT' | 'GOLD') => {
  
  // 1. DEFINICIÓN DE LA TASA (0.06%)
  const FEE_RATE = 0.0006; 

  // 2. CÁLCULO DE LA COMISIÓN
  const feeAmount = amount * FEE_RATE;
  
  // 3. CÁLCULO DE LO QUE RECIBE EL VENDEDOR
  const finalSellerAmount = amount - feeAmount;

  // 4. LÓGICA ANTI-BAN (Límites de riesgo para Silver)
  let riskAlert = false;
  const SILVER_LIMIT = 50000000; // Ejemplo: 50 Millones de Silver

  if (currency === 'SILVER' && amount > SILVER_LIMIT) {
    riskAlert = true;
    console.log("🚨 ALERTA: Transacción de alto volumen detectada. Revisar logs.");
  }

  return {
    originalAmount: amount,
    fee: feeAmount.toFixed(4),        // Tu ganancia
    netAmount: finalSellerAmount.toFixed(4), // Lo que va al vendedor
    isRisk: riskAlert,
    timestamp: new Date().toISOString()
  };
};

// Ejemplo de uso:
// Si alguien vende un ítem por 1,000,000 Silver:
// El sistema restará 600 Silver de comisión.
