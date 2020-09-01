exports.up = function(knex) {
  return knex.schema
  .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  .dropTableIfExists('users')
  .createTable('users', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username').notNullable();
    table.string('password').notNullable();
  })
  .createTable('boards', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('creatorId').notNullable();
    table.foreign('creatorId').references('id').inTable('users');
    table.string('title').notNullable();
  })  
  .createTable('lanes', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('boardId').notNullable();
    table.foreign('boardId').references('id').inTable('boards');
    table.string('title').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('lanes')
    .dropTableIfExists('boards')
    .dropTableIfExists('users');
};