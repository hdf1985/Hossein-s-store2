// config/db.js (Updated for SQL Server)
const sql = require('mssql');

const config = {
    user: 'ArticleUser',              // Your SQL Server Login
    password: 'ArticleYours&Hossein123', // Your Password
    server: 'hfardpc\\SqlExpress',   // Your SQL Server Name/Instance
    database: 'storeDB',             // The database name inside SQL Server
    //port: 5001,                      // Standard SQL Server default port (usually needed)
    options: {
        encrypt: false,               // Set to true if connecting to Azure/outside localhost
        trustServerCertificate: true,  // Required for self-signed certificates (common in local Express instances)
        //instanceName: 'SQLEXPRESS'
    }
};

module.exports = config;

// --- Make sure you are exporting this Promise directly ---
const pool = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool; // This returns the connected pool
    })
    .catch(err => {
        // IMPORTANT: Log the error and still return something, 
        // or re-throw the error, but don't just return 'pool' if the connection failed.
        console.error('SQL Server Database Connection Failed! Error: ', err);
        return null; // Return null or throw the error if connection fails
    });

module.exports = {
    sql,
    pool // Export the Promise for the pool
};