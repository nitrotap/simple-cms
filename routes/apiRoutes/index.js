const express = require('express');
const router = express.Router();

router.use(require('./deptRoutes'));
router.use(require('./roleRoutes'));


module.exports = router;