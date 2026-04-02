CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL, -- Tu alias de Albion o Discord
    wallet_address TEXT,    -- Para pagos en USDT/TRX
    reputation INTEGER DEFAULT 0
);

CREATE TABLE offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER,
    item_name TEXT,         -- Ej: "T8 Battleaxe"
    amount INTEGER,         -- Cantidad de Silver o Items
    price_usdt REAL,        -- Precio pactado
    status TEXT DEFAULT 'open', -- open, pending, completed
    FOREIGN KEY(seller_id) REFERENCES users(id)
);
