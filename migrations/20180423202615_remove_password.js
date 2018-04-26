
exports.up = function(knex) {
  return knex.schema.table('user', t => {
    t.dropColumn('password');
  });
};

exports.down = function(knex) {
  return knex.schema.table('user', t => {
    t.string('password').notNullable();
  });
};
