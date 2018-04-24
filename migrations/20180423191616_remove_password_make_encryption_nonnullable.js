exports.up = knex => {
  return knex.schema
    .alterTable('user', (table) => {
      table.string('salt').notNullable().alter();
      table.string('encrypted_password').notNullable().alter();
    });
};

exports.down = knex => {
  return knex.schema
    .alterTable('user', table => {
      table.string('salt').nullable().alter();
      table.string('encrypted_password').nullable().alter();
    });
};
