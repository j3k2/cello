const { create, findOne, update, del } = require("./common");
const knex = require("../knex");

async function createCard(params) {
  params.order = knex("cards").count().where({ lane_id: params.lane_id });
  return create("cards", params, ["id", "title"]);
}

async function getCard(params) {
  return findOne("cards", params);
}

async function moveCardWithinLane(id, params) {
  const { next, prev, lane_id } = params;
  if (next > prev) {
    await knex("cards")
      .where({ lane_id })
      .andWhere("order", "<=", next)
      .andWhere("order", ">", 0)
      .decrement("order", 1);
  }
  if (prev > next) {
    await knex("cards")
      .where({ lane_id })
      .andWhere("order", ">=", next)
      .andWhere("order", "<", knex("cards").count().where({ lane_id }))
      .increment("order", 1);
  }
  return knex("cards").where({ id }).update({ order: next });
}

async function moveCardBetweenLanes(id, params) {
  const { next, prev, nextLaneId, prevLaneId } = params;

  await knex("cards")
    .where({ lane_id: prevLaneId })
    .andWhere("order", ">=", prev)
    .decrement("order", 1);

  await knex("cards")
    .where({ lane_id: nextLaneId })
    .andWhere("order", ">=", next)
    .increment("order", 1);

  return knex("cards")
    .where({ id })
    .update({ order: next, lane_id: nextLaneId });
}

const editCard = (id, params) => {
  return update("cards", { id }, params, Object.keys(params));
};

async function deleteCard(id) {
	const card = await findOne('cards', {id});

  await knex("cards")
    .where({ lane_id: card.lane_id })
    .andWhere("order", ">", card.order)
    .decrement("order", 1);

  return del("cards", { id });
}

module.exports = {
  createCard,
  getCard,
  moveCardWithinLane,
  moveCardBetweenLanes,
  editCard,
  deleteCard,
};
