const mysql = require('mysql2/promise');
require('dotenv').config(); // <- ESSENCIAL: Garante que o db.js leia o .env

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // AQUI: A senha será lida corretamente
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;