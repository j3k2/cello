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

async function find(db, params, outputColumns) {
  const res = await knex(db)
    .select(outputColumns)
    .where(params);

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

module.exports = {
  findOne,
  find,
  create,
  count
}