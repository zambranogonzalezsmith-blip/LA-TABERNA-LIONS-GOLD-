# 🦁 LIONS-GOLD: Mercatus Uniti (P2P Interface)

![Version](https://img.shields.io/badge/Version-2.0.0-gold)
![License](https://img.shields.io/badge/Protocol-P2P--Secure-green)
![Status](https://img.shields.io/badge/Network-TRX%20%7C%20USDT%20%7C%20SILVER-blue)

**Mercatus Uniti** es la interfaz oficial de intercambio P2P para el gremio **LIONS-GOLD**. Este sistema permite el registro, cálculo de comisiones y seguimiento de transacciones seguras (Escrow) entre jugadores de Albion Online y operadores de criptoactivos.

---

## 🏛️ Arquitectura del Sistema

El proyecto opera bajo un modelo de **Soberanía Híbrida**:
1.  **Frontend Estático:** Alojado en GitHub Pages para máxima disponibilidad.
2.  **Persistencia Local:** Uso de `localStorage` para auditoría inmediata en el navegador del administrador.
3.  **Sincronización Central:** Conexión vía API Fetch a un servidor central (`server.js`) para consolidación de datos en base de datos SQL.

## 🛠️ Especificaciones Técnicas

* **Lenguajes:** HTML5, CSS3 (Custom Tactic UI), JavaScript (ES6+).
* **Protocolo de Red:** API RESTful mediante `fetch` asíncrono.
* **Motor de Comisiones:** Algoritmo de cálculo automático del **0.06%** integrado.
* **Seguridad:** Validación de firmas de usuario y sistema de Blacklist dinámico.

## 🚀 Instalación y Despliegue

### Requisitos Previos
* Servidor Backend activo (Node.js/Express).
* Navegador compatible con estándares modernos.

### Configuración del Frontend
1. Clona el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/lions-gold-p2p.git](https://github.com/tu-usuario/lions-gold-p2p.git)# LA-TABERNA-LIONS-GOLD-
