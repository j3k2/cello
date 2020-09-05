const boardQuery = require('../queries/board');

async function createBoard(req, res) {
	const created = await boardQuery.createBoard({
		creator_id: req.userId,
		title: req.body.title
	});
	res.json(created);
}

async function getBoards(req, res) {
	const boards = await boardQuery.getBoards({ creator_id: req.userId });
	res.json(boards)
}

async function getBoard(req, res) {
	const board = await boardQuery.getBoard({ board_id: req.params.id });
	res.json(board);
}

async function editBoard(req, res) {
	const board = await boardQuery.editBoard(req.params.id, req.body)
	res.json(board);
}

module.exports = {
	createBoard,
	getBoards,
	getBoard,
	editBoard
}