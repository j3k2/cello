const router = require('express').Router();

const {
	createBoard,
	getBoards,
	getBoard
} = require('../controllers/boards');

const {
	createLane,
	moveLane
} = require('../controllers/lanes');

const {
	createCard,
	moveCard
} = require('../controllers/cards');

const authorizer = require('../middleware/authorizer');

router.post('/api/boards/', authorizer, createBoard);
router.get('/api/boards/', authorizer, getBoards);
router.get('/api/boards/:id', authorizer, getBoard);
router.post('/api/lanes/', authorizer, createLane);
router.post('/api/cards/', authorizer, createCard);
router.post('/api/cards/:id/move', authorizer, moveCard);
router.post('/api/lanes/:id/move', authorizer, moveLane);
module.exports = router;