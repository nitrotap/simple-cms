const router = require('express').Router();
const db = require('../../db/connection');


router.get('/emp', (req, res) => {
	const sql = 'SELECT * from employee'; 
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

router.post('/emp', ({body}, res) => {
	const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
	console.log(body); // object with name and value
	const params = [body.firstName, body.lastName, body.roleId, body.managerId];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: 'success',
			data: body
		});
	});
});

router.delete('/emp/:id', (req, res) => {
	const sql = 'DELETE FROM employee WHERE id = ?';

	db.query(sql, req.params.id, (err, result) => {
		if (err) {
			res.status(400).json({ error: res.message });
		} else if (!result.affectedRows) {
			res.json({
				message: 'employee not found'
			});
		} else {
			res.json({
				message: 'deleted',
				changes: result.affectedRows,
				id: req.params.id
			});
		}
	});
});


// async function dbQuery(sql) {
// 	try {
// 		const results = await db.query(sql);
// 		console.log('+++ Database returned results: \n', results[0]);
// 		return results;
    
// 	} catch (error){
// 		console.error ('xxx Database returned an error: \n', error);
// 	}
// }


module.exports = router;