// Runs with node in order to create a test user with the given information.
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('database.db');

// Insert a new user
const username = 'Tzi'; // Replace with the desired username
const email = 'test@user.gr'; // Replace with the desired username
const password = 'testpass'; // Replace with the desired password

db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], function(err) {
	if (err) {
		return console.log(err.message);
	}
	console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// Close the database connection
db.close();
