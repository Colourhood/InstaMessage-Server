
exports.up = function(knex) {
  return knex.schema.table('user', t => {
    t.integer('userId').notNullable().defaultTo(0);
    t.string('role').notNullable().defaultTo('DEFAULT');
    t.string('organization').notNullable().defaultTo('DEFAULT');
  });
};

exports.down = function(knex) {
  return knex.schema.table('user', t => {
    t.dropColumn('userId');
    t.dropColumn('role');
    t.dropColumn('organization');
  });
};
