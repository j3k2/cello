const { create, find } = require('./common');
const knex = require('../knex');

async function createBoard(params) {
	return create('boards', params, ['id', 'title']);
}

async function getBoards(params) {
	return find('boards', params, ['id', 'title']);
}

async function getBoard(params) {
	return knex('boards')
	.innerJoin('lanes', function(){
		this.on('boards.id', 'lanes.boardId');
		this.andOnVal('boards.id', '=', params.boardId)
	})
	.select([
		'boards.id as boardId',
		'boards.title as boardTitle',
		knex.raw(`ARRAY_AGG(json_build_object('id', lanes.id, 'title', lanes.title)) as lanes`)
	])
	.groupBy('boards.id')
	.first();
}

module.exports = {
	createBoard,
	getBoards,
	getBoard
}