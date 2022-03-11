const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// html routes


// api routes
app.use('/api', apiRoutes);



// Start server after DB connection
db.connect(err => {
	if (err) throw err;
	console.log('Database connected.');
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});

module.exports = {express, PORT, app};