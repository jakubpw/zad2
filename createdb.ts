var sqlite3 = require('sqlite3').verbose()

const sqlite = sqlite3.verbose()
let db = new sqlite.Database('base.db')
db.serialize(function() {
  db.run("DROP TABLE IF EXISTS users");
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar, password varchar)");
  db.run("INSERT INTO users (username, password) VALUES ('user_1', 'user_1')");
  db.run("INSERT INTO users (username, password) VALUES ('user_2', 'user_2')");
})