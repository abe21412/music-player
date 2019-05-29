const express = require('express');
const router = express.Router();

const { getUserData } = require('../controllers/users')
router.get('/',getUserData)


module.exports = router;