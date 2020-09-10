const { create, find, update } = require('./common');
const knex = require('../knex');
const _ = require('lodash');

async function createBoard(params) {
	return create('boards', params, ['id', 'title']);
}

async function getBoards(params) {
	return find('boards', params, ['id', 'title']);
}

async function getBoard(params) {
	const board = await knex('boards').where({ id: params.board_id }).first();

	board.lanes = await knex('lanes').where({ board_id: params.board_id }).orderBy('order');

	const laneIds = _.map(board.lanes, 'id');
	const cards = await knex('cards').whereIn('lane_id', laneIds).orderBy('order');
	const cardsByLane = _.groupBy(cards, 'lane_id');
	board.lanes.forEach(lane => {
		lane.cards = cardsByLane[lane.id] ? cardsByLane[lane.id] : [];
	});
	
	return board;
}

const editBoard = (id, params) => {
	return update('boards', { id }, params, Object.keys(params));
}

module.exports = {
	createBoard,
	getBoards,
	getBoard,
	editBoard
}