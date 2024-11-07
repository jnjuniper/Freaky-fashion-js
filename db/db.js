// ladda moduler vi behöver
const sqlite3 = require('sqlite3').verbose();
var path = require('path');

// Ta fram absolut sökväg till databasfilen
const dbFilePath = path.resolve(process.cwd(), './db/freakyfashion.db');

//Skapa db-objekt - vi använder detta för att kommunicera med databasen

const db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

// Exportera db-objektet - detta gör att vi kan importera det (require) i andra delar av applikationen
module.exports = db;