const router = require('express').Router();
const db = require('../../db/connection');


router.get('/role', (req, res) => {
	const sql = 'SELECT * from roles'; 
	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({
			message: 'success',
			data: rows
		});
	});
});

module.exports = router;