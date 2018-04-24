const { saltHashPassword } = require('../routes/user/store')

exports.up = async function up (knex) {
  const users = await knex('user');
  await Promise.all(users.map(convertPassword));
  await knex.schema.table('user', t=> {
    t.dropColumn('password');
  });

  function convertPassword (user) {
    const { salt, hash } = saltHashPassword(user.password);
    return knex(user).where({ id: user.id })
      .update({
        salt,
        encrypted_password: hash
      });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.table('user', t => {
    t.string('password').notNullable()
  });
};
