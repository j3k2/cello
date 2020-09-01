const router = require('express').Router();

const {
	createBoard,
	getBoards,
	getBoard
} = require('../controllers/boards');

const {
	createLane
} = require('../controllers/lanes');

const authorizer = require('../middleware/authorizer');

router.post('/api/boards/', authorizer, createBoard);
router.get('/api/boards/', authorizer, getBoards);
router.get('/api/boards/:id', authorizer, getBoard);
router.post('/api/lanes/', authorizer, createLane);

module.exports = router;