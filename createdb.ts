var sqlite3 = require('sqlite3').verbose()

const sqlite = sqlite3.verbose()
let db = new sqlite.Database('base.db')
var firstDescription = 'Quiz algebraiczny, rozwiązanie każdego z równań należy wpisać w pole obok znaku = ' +
  'Zatwierdzeniem odpowiedzi, jest przejście do kolejnego pytania.  Do kolejnego pytania ' +
  'można przejść, nie udzielając odpowiedzi na pytanie poprzednie. Można cofnąć się do ' +
  'poprzedniego pytania. Nie można zakończyć quizu nie udzielając odpowiedzi na wszystkie ' +
  'pytania. Quiz można zakończyć przyciskiem "Stop", który jest aktywny tylko gdy są ' +
  'udzielone odpowiedzi na wszystkie pytania. Wynik to czas spędzony nad wszystkim ' +
  'pytaniami + kary za błedne odpowiedzi.'
var secondDescription = 'Quiz ortograficzny, poprawne litery należy wpisać w pole obok słowa ' +
  'Zatwierdzeniem odpowiedzi, jest przejście do kolejnego pytania.  Do kolejnego pytania ' +
  'można przejść, nie udzielając odpowiedzi na pytanie poprzednie. Można cofnąć się do ' +
  'poprzedniego pytania. Nie można zakończyć quizu nie udzielając odpowiedzi na wszystkie ' +
  'pytania. Quiz można zakończyć przyciskiem "Stop", który jest aktywny tylko gdy są ' +
  'udzielone odpowiedzi na wszystkie pytania. Wynik to czas spędzony nad wszystkim ' +
  'pytaniami + kary za błedne odpowiedzi.'
db.serialize(function () {
  db.run("DROP TABLE IF EXISTS users");
  db.run("DROP TABLE IF EXISTS quiz");
  db.run("DROP TABLE IF EXISTS question");
  db.run("DROP TABLE IF EXISTS result");
  db.run("DROP TABLE IF EXISTS ranking");
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar, password varchar)");
  db.run("INSERT INTO users (username, password) VALUES ('user_1', 'user_1')");
  db.run("INSERT INTO users (username, password) VALUES ('user_2', 'user_2')");
  db.run("CREATE TABLE quiz (id INTEGER PRIMARY KEY AUTOINCREMENT, tittle text NOT NULL, description text NOT NULL)");
  db.run("INSERT INTO quiz (tittle, description) VALUES ('matematyka', ?)", firstDescription);
  db.run("INSERT INTO quiz (tittle, description) VALUES ('ortografia', ?)", secondDescription);
  db.run("CREATE TABLE question (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_id INTEGER NOT NULL, description text NOT NULL, result VARCHAR, penalty INTEGER)");
  db.run("INSERT INTO question (quiz_id, description, result, penalty) VALUES ('1', '2 + 2 = ', '4', '2')");
  db.run("INSERT INTO question (quiz_id, description, result, penalty) VALUES ('1', '2 + 3 = ', '5', '3')");
  db.run("INSERT INTO question (quiz_id, description, result, penalty) VALUES ('1', '2 + 4 = ', '6', '4')");
  db.run("INSERT INTO question (quiz_id, description, result, penalty) VALUES ('1', '2 + 5 = ', '7', '5')");
  db.run("INSERT INTO question (quiz_id, description, result, penalty) VALUES ('2', 'k_esło', 'rz', '2')");
  db.run("INSERT INTO question (quiz_id, description, result, penalty) VALUES ('2', 'ż_łw', 'ó', '3')");
  db.run("CREATE TABLE result (question_id INTEGER NOT NULL, quiz_id INTEGER NOT NULL, user_id INTEGER NOT NULL, answer VARCHAR, time INTEGER)");
  db.run("CREATE TABLE ranking (quiz_id INTEGER NOT NULL, user_login INTEGER NOT NULL, result INTEGER NOT NULL)");
})