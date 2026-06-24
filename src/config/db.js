const { Pool } = require("pg");

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false }
          }
        : {
              user: process.env.DB_USER || "postgres",
              host: process.env.DB_HOST || "localhost",
              database: process.env.DB_NAME || "smart-route-optimizer",
              password: process.env.DB_PASSWORD || "postgre123",
              port: process.env.DB_PORT || 5432,
          }
);



module.exports = pool;

pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch(err => console.error("❌ Database connection failed:", err.message));