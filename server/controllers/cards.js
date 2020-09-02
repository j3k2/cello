const card = require('../queries/card');

async function createCard(req, res) {
	const created = await card.createCard({
		lane_id: req.body.laneId,
		text: req.body.text
	});
	res.json(created);
}

module.exports = {
	createCard
}