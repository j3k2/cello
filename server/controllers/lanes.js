const lane = require('../queries/lane');

async function createLane(req, res) {
	const created = await lane.createLane({
		board_id: req.body.boardId,
		title: req.body.title
	});
	res.json(created);
}

async function moveLane(req, res) {
	const success = await lane.moveLane(req.params.id, {
		prev: req.body.prev, 
		next: req.body.next, 
		board_id: req.body.boardId});

	if(success) {
		res.status(200).json('OK')
	} else {
		res.status(500).json('ERROR');
	}
}

async function editLane(req, res) {
	const board = await lane.editLane(req.params.id, req.body);
	res.json(board);
}

module.exports = {
	createLane,
	moveLane,
	editLane
}