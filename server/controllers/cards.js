const card = require('../queries/card');

async function createCard(req, res) {
	const created = await card.createCard({
		lane_id: req.body.laneId,
		text: req.body.text
	});
	res.json(created);
}

async function moveCard(req, res) {
	if (req.body.nextLaneId) {
		const success = await card.moveCardBetweenLanes(req.params.id, req.body);

		if (success) {
			res.status(200).json('OK')
		} else {
			res.status(500).json('ERROR');
		}
	} else {
		const success = await card.moveCardWithinLane(req.params.id, {
			prev: req.body.prev,
			next: req.body.next,
			lane_id: req.body.laneId
		});

		if (success) {
			res.status(200).json('OK')
		} else {
			res.status(500).json('ERROR');
		}
	}
}
module.exports = {
	createCard,
	moveCard
}