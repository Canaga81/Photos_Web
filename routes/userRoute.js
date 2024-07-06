const express = require('express');
const router = express.Router();

const {createUser, loginUser, getDashboardPage} = require('../controllers/userController.js');
const { authenticateToken } = require('../middlewares/authMiddleware.js')

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/dashboard', authenticateToken, getDashboardPage);

module.exports = router;