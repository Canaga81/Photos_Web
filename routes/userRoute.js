const express = require('express');
const router = express.Router();

const { createUser, loginUser, getDashboardPage, getAllUsers, getAUser, follow, unfollow } = require('../controllers/userController.js');
const { authenticateToken } = require('../middlewares/authMiddleware.js')

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/dashboard', authenticateToken, getDashboardPage);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getAUser);
router.put('/:id/follow', authenticateToken, follow);
router.put('/:id/unfollow', authenticateToken, unfollow);

module.exports = router;