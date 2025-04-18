const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Path to the database file
const dbPath = path.join(__dirname, 'data', 'genbi.db');

// Create a new database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('Connected to the database.');
});

// Query to get all tables
const tableQuery = `
  SELECT name FROM sqlite_master 
  WHERE type='table' 
  ORDER BY name;
`;

// Execute the query
db.all(tableQuery, [], (err, tables) => {
  if (err) {
    console.error('Error querying tables:', err.message);
    db.close();
    process.exit(1);
  }
  
  console.log('Tables in the database:');
  tables.forEach((table) => {
    console.log(`- ${table.name}`);
  });
  
  // Close the database connection
  db.close();
});
