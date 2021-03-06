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
    table.uuid('creator_id').notNullable();
    table.foreign('creator_id').references('id').inTable('users');
    table.string('title').notNullable();
  })  
  .createTable('lists', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('board_id').notNullable();
    table.foreign('board_id').references('id').inTable('boards');
    table.string('title').notNullable();
    table.integer('order').notNullable();
  })
  .createTable('cards', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('list_id').notNullable();
    table.foreign('list_id').references('id').inTable('lists');
    table.uuid('board_id').notNullable();
    table.foreign('board_id').references('id').inTable('boards');
    table.string('title').notNullable();
    table.text('description');
    table.integer('order').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('cards')
    .dropTableIfExists('lists')
    .dropTableIfExists('boards')
    .dropTableIfExists('users');
};