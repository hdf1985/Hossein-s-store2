// controllers/productController.js (The file throwing the error)
const { pool } = require("../config/db"); // Imports the Promise

exports.getProducts = async (req, res) => {
    try {
        // --- THIS LINE IS CRITICAL ---
        const connection = await pool; // AWAIT the Promise to get the connected pool object

        if (!connection) {
             // Handle the case where the connection failed in config/db.js
             return res.status(500).json({ error: "Database connection object is null (connection failed earlier)" });
        }
        
        // Use the connection object to make a request
        const result = await connection.request().query("SELECT * FROM products");
        
        // Send back the records
        res.json(result.recordset); 
        
    } catch (err) {
        // If the query fails (e.g., wrong table name)
        console.error("DB query error:", err);
        return res.status(500).json({ error: err.message || "Unknown DB query error" });
    }
};