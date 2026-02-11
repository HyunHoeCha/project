import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: "12345",
    database: "reservations",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 5,
})