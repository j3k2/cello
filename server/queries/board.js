const { create, find } = require('./common');
const knex = require('../knex');

async function createBoard(params) {
	return create('boards', params, ['id', 'title']);
}

async function getBoards(params) {
	return find('boards', params, ['id', 'title']);
}

async function getBoard(params) {
	const board = await knex('boards').where({ id: params.board_id }).first();
	board.lanes = await knex('lanes').where({ board_id: params.board_id });
	// const board = await knex('boards')
	// 	.innerJoin('lanes', function () {
	// 		this.on('boards.id', 'lanes.board_id');
	// 		this.andOnVal('boards.id', '=', params.board_id)
	// 	})
	// 	.select([
	// 		'boards.id as id',
	// 		'boards.title as title',
	// 		knex.raw(`ARRAY_AGG(json_build_object('id', lanes.id, 'title', lanes.title, 'order', lanes.order)) as lanes`)
	// 	])
	// 	.groupBy('boards.id')
	// 	.first();

	board.lanes = board.lanes.sort((a, b) => a.order - b.order);

	const cardsPerLane = await Promise.all(board.lanes.map(async (lane) => {
		return knex('cards').where({ lane_id: lane.id });
	}));

	board.lanes.forEach((lane, idx) => {
		lane.cards = cardsPerLane[idx].sort((a, b) => a.order - b.order);
	});
	// console.log(board);
	return board;
}

module.exports = {
	createBoard,
	getBoards,
	getBoard
}