const { create, find, update } = require("./common");
const knex = require("../knex");
const _ = require("lodash");

async function createBoard(params) {
  return create("boards", params, ["id", "title"]);
}

async function getBoards(params) {
  return find("boards", params, ["id", "title"], "title");
}

async function getBoard(params) {
  try {
    return await knex.transaction(async (trx) => {
      const board = await knex("boards")
        .where({ id: params.id })
        .first()
        .transacting(trx);

      board.lists = await knex("lists")
        .where({ board_id: params.id })
        .orderBy("order")
        .transacting(trx);

      const listIds = _.map(board.lists, "id");
      const cards = await knex("cards")
        .select("id", "list_id", "title", "order")
        .whereIn("list_id", listIds)
        .orderBy("order")
        .transacting(trx);
      const cardsByList = _.groupBy(cards, "list_id");
      board.lists.forEach((list) => {
        list.cards = cardsByList[list.id] ? cardsByList[list.id] : [];
      });

      return board;
    });
  } catch (err) {
    console.error("Error in getBoard query: ", err.message);
    return null;
  }
}

const editBoard = (id, params) => {
  return update("boards", { id }, params, Object.keys(params));
};

async function deleteBoard(id) {
  try {
    await knex.transaction(async (trx) => {
      const lists = await knex("lists")
        .where({ board_id: id })
        .transacting(trx);

      const listIds = _.map(lists, "id");

      await knex("cards").whereIn("list_id", listIds).delete().transacting(trx);

      await knex("lists").where({ board_id: id }).delete().transacting(trx);

      await knex("boards").where({ id }).delete().transacting(trx);
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  editBoard,
  deleteBoard,
};
