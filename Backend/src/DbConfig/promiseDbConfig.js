import { createPool } from 'mysql2/promise';
import { configDotenv } from 'dotenv';
const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

})


export default pool