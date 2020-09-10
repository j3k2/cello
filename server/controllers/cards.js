const card = require('../queries/card');

async function createCard(req, res) {
	try {
		const created = await card.createCard({
			lane_id: req.body.laneId,
			text: req.body.text
		});
		res.json(created);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error: ' + err.message);
	}
}

async function moveCard(req, res) {
	try {
		if (req.body.nextLaneId) {
			const success = await card.moveCardBetweenLanes(req.params.id, req.body);

			if (success) {
				res.status(200).json('OK')
			} else {
				res.status(500).json('Could not update card position');
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
				res.status(500).json('Could not update card position');
			}
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error: ' + err.message);
	}
}

module.exports = {
	createCard,
	moveCard
}