const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database location
const dbPath = path.join(__dirname, "quicksearch.db");

// Create/Open database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite Database");
  }
});

// Create Tables
db.serialize(() => {

  // Users
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    )
  `);

  // Family Members
  db.run(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);
db.run(`
INSERT OR IGNORE INTO members
(id,name)

VALUES

(1,'Onu'),

(2,'Anil'),

(3,'Reena'),

(4,'Anjali')
`);
  // Documents
  db.run(`
CREATE TABLE IF NOT EXISTS documents (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    memberId INTEGER NOT NULL,

    title TEXT NOT NULL,

    category TEXT,

    originalName TEXT,

    storedName TEXT,

    fileType TEXT,

    fileSize INTEGER,

    uploadDate TEXT,

    FOREIGN KEY(memberId)
    REFERENCES members(id)

)
`);

});

module.exports = db;