
exports.up = function(knex) {
  return knex.schema.table('user', t => {
    t.string('userId').notNullable().defaultTo('DEFAULT').alter();
  });
};

exports.down = function(knex, Promise) {
  t.integer('userId').notNullable().defaultTo(0).alter();
};
