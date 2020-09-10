const boardQuery = require('../queries/board');

async function createBoard(req, res) {
	try {
		const created = await boardQuery.createBoard({
			creator_id: req.userId,
			title: req.body.title
		});
		res.json(created);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error: ' + err.message);
	}
}

async function getBoards(req, res) {
	try {
		const boards = await boardQuery.getBoards({ creator_id: req.userId });
		res.json(boards);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error: ' + err.message);
	}
}

async function getBoard(req, res) {
	try {
		const board = await boardQuery.getBoard(req.params);
		if (!board) {
			return res.status(500).json('Could not find board');
		}
		if (board.creator_id !== req.userId) {
			res.status(403).json('User cannot access this board');
		} else {
			res.json(board);
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error: ' + err.message);
	}
}

async function editBoard(req, res) {
	try {
		const board = await boardQuery.editBoard(req.params.id, req.body)
		res.json(board);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error: ' + err.message);
	}
}

module.exports = {
	createBoard,
	getBoards,
	getBoard,
	editBoard
}