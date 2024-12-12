// 1. Import Required Packages
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 2. Initialize the Express App
const app = express();
const db = new sqlite3.Database('database.db'); // Using the created database file

// 3. Set Up Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 4. Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// 5. Define Routes
// Login endpoint
app.post('/login', (req, res) => {
	const { email, password } = req.body;
	db.get('SELECT username FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
		if (err) {
			return res.status(500).json({ success: false, message: 'Database error' });
		}
		if (row) {
			return res.json({ success: true, username: row.username });
		} else {
			return res.json({ success: false, message: 'Invalid credentials' });
		}
	});
});


// 6. Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
