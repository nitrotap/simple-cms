const router = require('express').Router();
const db = require('../../db/connection');


router.get('/dept', (req, res) => {
	console.log('GET');
	const sql = 'SELECT * from department'; 
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