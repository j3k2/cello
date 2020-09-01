const boardQuery = require('../queries/board');

async function createBoard(req, res) {
	const created = await boardQuery.createBoard({
		creatorId: req.userId,
		title: req.body.title
	});
	res.json(created);
}

async function getBoards(req, res) {
	const boards = await boardQuery.getBoards({ creatorId: req.userId });
	res.json(boards)
}

async function getBoard(req, res) {
	const board = await boardQuery.getBoard({ boardId: req.params.id });
	console.log(board);
	res.json(board);
}

module.exports = {
	createBoard,
	getBoards,
	getBoard
}