const { create, update } = require('./common');
const knex = require('../knex');

async function createLane(params) {
	const { board_id } = params;
	params.order = knex('lanes').count().where({ board_id });
	return create('lanes', params, ['id', 'title']);
}

async function moveLane(id, params) {
	const { next, prev, board_id } = params;
	if (next > prev) {
		await knex('lanes')
			.where({ board_id })
			.andWhere('order', '<=', next)
			.andWhere('order', '>', 0)
			.decrement('order', 1);
	}
	if (prev > next) {
		await knex('lanes')
			.where({ board_id })
			.andWhere('order', '>=', next)
			.andWhere('order', '<', knex('lanes').count().where({ board_id }))
			.increment('order', 1);
	}
	return knex('lanes').where({ id }).update({ order: next });
}

const editLane = (id, params) => {
	return update('lanes', { id }, params, Object.keys(params));
}

module.exports = {
	createLane,
	moveLane,
	editLane
}