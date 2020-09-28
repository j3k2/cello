const { findOne, update } = require("./common");
const knex = require("../knex");

async function createCard(params) {
  try {
    return await knex.transaction(async (trx) => {
      const counts = await knex("cards")
        .count()
        .where({ list_id: params.list_id })
        .first()
        .transacting(trx);

      params.order = parseInt(counts.count);

      const cards = await knex("cards")
        .insert(params)
        .returning(["id", "title"])
        .transacting(trx);

      return cards[0];
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getCard(params) {
  return findOne("cards", params);
}

async function moveCardWithinList(id, params) {
  try {
    await knex.transaction(async (trx) => {
      const { next, prev, list_id } = params;
      if (next > prev) {
        await knex("cards")
          .where({ list_id })
          .andWhere("order", "<=", next)
          .andWhere("order", ">", 0)
          .decrement("order", 1)
          .transacting(trx);
      }
      if (prev > next) {
        await knex("cards")
          .where({ list_id })
          .andWhere("order", ">=", next)
          .andWhere("order", "<", knex("cards").count().where({ list_id }))
          .increment("order", 1)
          .transacting(trx);
      }
      await knex("cards")
        .where({ id })
        .update({ order: next })
        .transacting(trx);
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function moveCardBetweenLists(id, params) {
  try {
    await knex.transaction(async (trx) => {
      const { next, prev, nextListId, prevListId } = params;

      await knex("cards")
        .where({ list_id: prevListId })
        .andWhere("order", ">=", prev)
        .decrement("order", 1)
        .transacting(trx);

      await knex("cards")
        .where({ list_id: nextListId })
        .andWhere("order", ">=", next)
        .increment("order", 1)
        .transacting(trx);

      await knex("cards")
        .where({ id })
        .update({ order: next, list_id: nextListId })
        .transacting(trx);
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

const editCard = (id, params) => {
  return update("cards", { id }, params, Object.keys(params));
};

async function deleteCard(id) {
  try {
    await knex.transaction(async (trx) => {
      const card = await knex("cards").where({ id }).first().transacting(trx);

      await knex("cards")
        .where({ list_id: card.list_id })
        .andWhere("order", ">", card.order)
        .decrement("order", 1)
        .transacting(trx);

      await knex("cards").where({ id }).delete().transacting(trx);
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  createCard,
  getCard,
  moveCardWithinList,
  moveCardBetweenLists,
  editCard,
  deleteCard,
};
