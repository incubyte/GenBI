const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Path to the database file
const dbPath = path.join(__dirname, 'data', 'genbi.db');

// Path to the schema SQL file
const schemaPath = path.join(__dirname, 'data', 'schema.sql');

// Read the schema SQL
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

// Create a new database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('Connected to the database.');
});

// Execute the schema SQL
db.exec(schemaSql, (err) => {
  if (err) {
    console.error('Error creating database schema:', err.message);
    process.exit(1);
  }

  console.log('Database schema created successfully!');

  // Close the database connection
  db.close();
});
