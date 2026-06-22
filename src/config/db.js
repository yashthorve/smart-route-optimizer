const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "smart-route-optimizer",
    password: "postgre123", // Replace with your actual password
    port: 5432, // Default PostgreSQL port
});



module.exports = pool;

pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch(err => console.error("❌ Database connection failed:", err.message));