import { createConnection } from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

export function createDbConnection() {
    const connection = createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });

    connection.connect((error)=>{
        if (!error) {
            console.log("database connected successfully..........")
        } else {
            console.log(error)
        }
    })
    return connection
}