const router = require('express').Router();

const {
	createBoard,
	getBoards,
	getBoard,
	editBoard,
	deleteBoard
} = require('../controllers/boards');

const {
	createList,
	moveList,
	editList,
	deleteList
} = require('../controllers/lists');

const {
	createCard,
	moveCard,
	getCard,
	editCard,
	deleteCard
} = require('../controllers/cards');

const authorizer = require('../middleware/authorizer');

router.post('/api/boards/', authorizer, createBoard);
router.get('/api/boards/', authorizer, getBoards);
router.get('/api/boards/:id', authorizer, getBoard);
router.patch('/api/boards/:id', authorizer, editBoard);
router.delete('/api/boards/:id', authorizer, deleteBoard);

router.post('/api/lists/', authorizer, createList);
router.post('/api/lists/:id/move', authorizer, moveList);
router.patch('/api/lists/:id', authorizer, editList);
router.delete('/api/lists/:id', authorizer, deleteList);

router.post('/api/cards/', authorizer, createCard);
router.post('/api/cards/:id/move', authorizer, moveCard);
router.get('/api/cards/:id', authorizer, getCard);
router.patch('/api/cards/:id', authorizer, editCard);
router.delete('/api/cards/:id', authorizer, deleteCard);

module.exports = router;