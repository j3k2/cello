const { create } = require('./common');

async function createLane(params) {
	return create('lanes', params, ['id', 'title']);
}

module.exports = {
	createLane
}