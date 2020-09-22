const router = require('express').Router();

const {
	createBoard,
	getBoards,
	getBoard,
	editBoard
} = require('../controllers/boards');

const {
	createLane,
	moveLane,
	editLane
} = require('../controllers/lanes');

const {
	createCard,
	moveCard,
	getCard,
	editCard
} = require('../controllers/cards');

const authorizer = require('../middleware/authorizer');

router.post('/api/boards/', authorizer, createBoard);
router.get('/api/boards/', authorizer, getBoards);
router.get('/api/boards/:id', authorizer, getBoard);
router.patch('/api/boards/:id', authorizer, editBoard);

router.post('/api/lanes/', authorizer, createLane);
router.post('/api/lanes/:id/move', authorizer, moveLane);
router.patch('/api/lanes/:id', authorizer, editLane);

router.post('/api/cards/', authorizer, createCard);
router.post('/api/cards/:id/move', authorizer, moveCard);
router.get('/api/cards/:id', authorizer, getCard);
router.patch('/api/cards/:id', authorizer, editCard);

module.exports = router;