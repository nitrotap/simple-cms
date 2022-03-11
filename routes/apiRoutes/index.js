const express = require('express');
const router = express.Router();

router.use(require('./deptRoutes'));

module.exports = router;