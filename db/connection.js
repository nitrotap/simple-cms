const mysql = require('mysql2');
const token = 'SQLr0cks!';

// Connect to database
const db = mysql.createConnection(
	{
		host: 'localhost',
		// Your MySQL username,
		user: 'root',
		// Your MySQL password
		password: token,
		database: 'cms'
	},
	console.log('Connected to the cms database.')
).promise();

module.exports = db;
