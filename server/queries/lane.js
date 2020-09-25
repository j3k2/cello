const { update } = require("./common");
const knex = require("../knex");

async function createLane(params) {
  try {
    return await knex.transaction(async (trx) => {
      const { board_id } = params;
      const counts = await knex("lanes")
        .count()
        .where({ board_id })
        .first()
        .transacting(trx);

      params.order = parseInt(counts.count);

      const lanes = await knex("lanes")
        .insert(params)
        .returning(["id", "title"])
        .transacting(trx);

      return lanes[0];
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function moveLane(id, params) {
  try {
    await knex.transaction(async (trx) => {
      const { next, prev, board_id } = params;
      if (next > prev) {
        await knex("lanes")
          .where({ board_id })
          .andWhere("order", "<=", next)
          .andWhere("order", ">", 0)
          .decrement("order", 1)
          .transacting(trx);
      }
      if (prev > next) {
        await knex("lanes")
          .where({ board_id })
          .andWhere("order", ">=", next)
          .andWhere("order", "<", knex("lanes").count().where({ board_id }))
          .increment("order", 1)
          .transacting(trx);
      }
      await knex("lanes")
        .where({ id })
        .update({ order: next })
        .transacting(trx);
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

const editLane = (id, params) => {
  return update("lanes", { id }, params, Object.keys(params));
};

async function deleteLane(id) {
  try {
    await knex.transaction(async (trx) => {
      const lane = await knex("lanes").where({ id }).first().transacting(trx);

      await knex("lanes")
        .where({ board_id: lane.board_id })
        .andWhere("order", ">", lane.order)
        .decrement("order", 1)
        .transacting(trx);

      await knex("cards").where({ lane_id: id }).delete().transacting(trx);

      await knex("lanes").where({ id }).delete().transacting(trx);
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  createLane,
  moveLane,
  editLane,
  deleteLane,
};
