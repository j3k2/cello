const router = require('express').Router();

const {
	createBoard,
	getBoards
} = require('../controllers/boards');

const authorizer = require('../middleware/authorizer');

router.post('/api/boards/', authorizer, createBoard);
router.get('/api/boards/', authorizer, getBoards);

module.exports = router;