const { saltHashPassword } = require('../userRouter/store')

exports.up = async function up (knex) {
	await knex.schema.table('user', t => {
		t.string('salt')
		t.string('encrypted_password')
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.table('user', t => {
		t.dropColumn('salt')
		t.dropColumn('encrypted_password')
	})
}
