const { saltHashPassword } = require('../routes/user/store')

exports.up = async function up (knex) {
  await knex.schema.table('user', t=> {
    t.dropColumn('password');
  });
  await knex.schema.alterTable('user', t => {
    t.string('salt').nonNullable().alter();
    t.string('encrypted_password').nonNullable().alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('user', t => {
    t.string('salt').nullable().alter()
    t.string('encrypted_password').nullable().alter()
    t.string('password').notNullable()
  });
};
