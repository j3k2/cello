const router = require('express').Router();

const {
	createBoard,
	getBoards,
	getBoard
} = require('../controllers/boards');

const {
	createLane
} = require('../controllers/lanes');

const {
	createCard
} = require('../controllers/cards');

const authorizer = require('../middleware/authorizer');

router.post('/api/boards/', authorizer, createBoard);
router.get('/api/boards/', authorizer, getBoards);
router.get('/api/boards/:id', authorizer, getBoard);
router.post('/api/lanes/', authorizer, createLane);
router.post('/api/cards/', authorizer, createCard);

module.exports = router;