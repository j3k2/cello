const knex = require('../knex');

async function count(db, params) {
  const res = await knex(db)
    .count()
    .where(params)
    .first();

  return parseInt(res.count);
}

async function findOne(db, params, outputColumns) {
  const res = await knex(db)
    .select(outputColumns)
    .where(params)
    .first();

  return res;
}

async function find(db, params, outputColumns, order = 'id') {
  const res = await knex(db)
    .select(outputColumns)
    .where(params)
    .orderBy(order);

  return res;
}

async function create(db, params, outputColumns = 'id') {
  const res = await knex(db)
    .returning(outputColumns)
    .insert(params);

  if (!res.length) {
    return null;
  }

  return res[0];
}

async function update(db, where, params, outputColumns = '*') {
  const res = await knex(db)
    .update(params)
    .where(where)
    .returning(outputColumns);

  if (!res.length) {
    return null;
  }

  return res[0];
}

async function del(db, where) {
  const res = await knex(db)
    .where(where)
    .del();

  return res;
}

module.exports = {
  findOne,
  find,
  create,
  count,
  update,
  del
}