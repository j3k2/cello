const { update } = require("./common");
const knex = require("../knex");

async function createList(params) {
  try {
    return await knex.transaction(async (trx) => {
      const { board_id } = params;
      const counts = await knex("lists")
        .count()
        .where({ board_id })
        .first()
        .transacting(trx);

      params.order = parseInt(counts.count);

      const lists = await knex("lists")
        .insert(params)
        .returning(["id", "title"])
        .transacting(trx);

      return lists[0];
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function moveList(id, params) {
  try {
    await knex.transaction(async (trx) => {
      const { next, prev, board_id } = params;
      if (next > prev) {
        await knex("lists")
          .where({ board_id })
          .andWhere("order", "<=", next)
          .andWhere("order", ">", 0)
          .decrement("order", 1)
          .transacting(trx);
      }
      if (prev > next) {
        await knex("lists")
          .where({ board_id })
          .andWhere("order", ">=", next)
          .andWhere("order", "<", knex("lists").count().where({ board_id }))
          .increment("order", 1)
          .transacting(trx);
      }
      await knex("lists")
        .where({ id })
        .update({ order: next })
        .transacting(trx);
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

const editList = (id, params) => {
  return update("lists", { id }, params, Object.keys(params));
};

async function deleteList(id) {
  try {
    await knex.transaction(async (trx) => {
      const list = await knex("lists").where({ id }).first().transacting(trx);

      await knex("lists")
        .where({ board_id: list.board_id })
        .andWhere("order", ">", list.order)
        .decrement("order", 1)
        .transacting(trx);

      await knex("cards").where({ list_id: id }).delete().transacting(trx);

      await knex("lists").where({ id }).delete().transacting(trx);
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  createList,
  moveList,
  editList,
  deleteList,
};
