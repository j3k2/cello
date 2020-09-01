const board = require('../queries/lane');

async function createLane(req, res) {
	const created = await board.createLane({
		boardId: req.body.boardId,
		title: req.body.title
	});
	res.json(created);
}

module.exports = {
	createLane
}