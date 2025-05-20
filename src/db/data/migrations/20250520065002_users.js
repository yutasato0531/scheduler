/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('user_name').notNullable().unique();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table
      .string('salt')
      .notNullable()
      .unique();
    table
      .string('hash')
      .notNullable()
      .unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('users');
};
