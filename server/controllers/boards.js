const board = require('../queries/board');

async function createBoard(req, res) {
	const created = await board.createBoard({
		creatorId: req.userId,
		title: req.body.title
	});
	res.json(created);
}

async function getBoards(req, res) {
	const boards = await board.getBoards({ creatorId: req.userId });
	res.json(boards)
}

module.exports = {
	createBoard,
	getBoards
}