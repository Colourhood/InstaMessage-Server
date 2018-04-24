const { saltHashPassword } = require('../routes/user/store')

exports.up = async function up (knex) {
  const users = await knex('user');
  await Promise.all(users.map(convertPassword));
  await knex.schema.table('user', t=> {
    t.dropColumn('password');
  });
  await knex.schema.alterTable('user', t => {
    t.string("salt").nonNullable().alter();
    t.string("encrypted_password").nonNullable().alter();
  });

  function convertPassword (user){
    const { salt, hash } = saltHashPassword(user.password);
    return knex(user).where({ username: user.username })
      .update({
        salt,
        encrypted_password: hash
      });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.table('user', t => {
    t.dropColumn('salt')
    t.dropColumn('encrypted_password')
    t.string('password').notNullable()
  });
};
