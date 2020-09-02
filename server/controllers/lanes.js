const lane = require('../queries/lane');

async function createLane(req, res) {
	const created = await lane.createLane({
		board_id: req.body.boardId,
		title: req.body.title
	});
	res.json(created);
}

module.exports = {
	createLane
}