const { create, find } = require('./common');
const knex = require('../knex');

async function createBoard(params) {
	return create('boards', params, ['id', 'title']);
}

async function getBoards(params) {
	return find('boards', params, ['id', 'title']);
}

async function getBoard(params) {
	// TO DO: replace naive multiple queries:
	const board = await knex('boards').where({id: params.board_id}).first();
	
	board.lanes = await knex('lanes').where({board_id: params.board_id});

	const cardsPerLane = await Promise.all(board.lanes.map(async (lane)=>{
		return knex('cards').where({lane_id: lane.id});
	}));

	board.lanes.forEach((lane,idx)=>{
		lane.cards = cardsPerLane[idx];
	});

	return board;
}

module.exports = {
	createBoard,
	getBoards,
	getBoard
}