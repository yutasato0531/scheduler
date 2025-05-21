/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('tasks', (table) => {
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id');
    table.integer('year').notNullable();
    table.integer('month').notNullable();
    table.integer('date').notNullable();
    table.integer('hour').notNullable();
    table.integer('minute').notNullable();
    table.string('task');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('tasks');
};
