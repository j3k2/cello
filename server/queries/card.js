const { create } = require('./common');

async function createCard(params) {
	return create('cards', params, ['id', 'text']);
}

module.exports = {
	createCard
}