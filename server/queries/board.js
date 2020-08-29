const { create, find } = require('./common');

async function createBoard(params) {
	return create('boards', params, ['id', 'title']);
}

async function getBoards(params) {
	return find('boards', params, ['id', 'title']);
}

module.exports = {
	createBoard,
	getBoards
}