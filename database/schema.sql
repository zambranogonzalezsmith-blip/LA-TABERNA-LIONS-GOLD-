-- TABLA DE USUARIOS (Censo del Clan)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE, 
    wallet_address TEXT,    
    reputation INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active' -- active o blacklisted
);

-- TABLA DE OFERTAS (El Mercado)
CREATE TABLE IF NOT EXISTS offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER,
    item_name TEXT NOT NULL,         
    amount REAL NOT NULL,           
    price_usdt REAL NOT NULL,       
    fee_applied REAL,               -- Aquí guardamos el 0.06%
    status TEXT DEFAULT 'open',     -- open, pending, completed
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(seller_id) REFERENCES users(id)
);

-- REGISTRO DE SEGURIDAD (Blacklist)
CREATE TABLE IF NOT EXISTS blacklist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bad_user_id INTEGER,
    reason TEXT,
    date_banned DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(bad_user_id) REFERENCES users(id)
);
