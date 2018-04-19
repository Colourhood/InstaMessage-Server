const { saltHashPassword } = require('userRouter/store')

exports.up = function(knex, Promise) {
	return knex.schema.table('user', t => {
		t.string('salt').defaultTo('default').notNullable()
		t.string('encrypted_password').defaultTo('default').notNullable()
	})
	.then(() => knex('user'))
	.then(users => Promise.all(users.map(convertPassword)))
	.then(() => {
		return knex.schema.table('user', t => {
			t.dropColumn('password')
		})
	})

	function convertPassword (user) {
		const { salt, hash } = saltHashPassword(user.password)
		return knex('user').where({ id: user.id })
			.update({
				salt,
				encrypted_password: hash
			})
	}
}

exports.down = function(knex, Promise) {
	return knex.schema.table('user', t => {
		t.dropColumn('salt')
		t.dropColumn('encrypted_password')
		t.string('password').notNullable()
	})
}
