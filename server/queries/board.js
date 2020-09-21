const { create, find, update } = require('./common');
const knex = require('../knex');
const _ = require('lodash');

async function createBoard(params) {
	return create('boards', params, ['id', 'title']);
}

async function getBoards(params) {
	return find('boards', params, ['id', 'title'], 'title');
}

async function getBoard(params) {
	try {
		const board = await knex('boards').where({ id: params.id }).first();

		board.lanes = await knex('lanes').where({ board_id: params.id }).orderBy('order');

		const laneIds = _.map(board.lanes, 'id');
		const cards = await knex('cards').whereIn('lane_id', laneIds).orderBy('order');
		const cardsByLane = _.groupBy(cards, 'lane_id');
		board.lanes.forEach(lane => {
			lane.cards = cardsByLane[lane.id] ? cardsByLane[lane.id] : [];
		});

		return board;
	} catch (err) {
		console.error('Error in getBoard query: ', err.message);
		return null;
	}
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