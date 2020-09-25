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

      board.lanes = await knex("lanes")
        .where({ board_id: params.id })
        .orderBy("order")
        .transacting(trx);

      const laneIds = _.map(board.lanes, "id");
      const cards = await knex("cards")
        .select("id", "lane_id", "title", "order")
        .whereIn("lane_id", laneIds)
        .orderBy("order")
        .transacting(trx);
      const cardsByLane = _.groupBy(cards, "lane_id");
      board.lanes.forEach((lane) => {
        lane.cards = cardsByLane[lane.id] ? cardsByLane[lane.id] : [];
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
      const lanes = await knex("lanes")
        .where({ board_id: id })
        .transacting(trx);

      const laneIds = _.map(lanes, "id");

      await knex("cards").whereIn("lane_id", laneIds).delete().transacting(trx);

      await knex("lanes").where({ board_id: id }).delete().transacting(trx);

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
