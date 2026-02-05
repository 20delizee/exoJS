import dotenv from 'dotenv';
import mariadb from 'mariadb';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'civelampus',
    connectionLimit: 10,
});


async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log(' Connexion à la base de données MariaDB réussie');
        return true;
    } catch (err) {
        console.error(' Erreur de connexion à la base de données:', err.message);
        return false;
    } finally {
        if (conn) conn.release();
    }
}

export { pool, testConnection };
