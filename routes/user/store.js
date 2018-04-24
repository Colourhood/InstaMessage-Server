const crypto = require('crypto')
const knex = require('knex')(require('../../knexfile'))

function createUser({username, password}) {
	console.log(`A new user was created ${username}`)
	const { salt, hash } = saltHashPassword(password)
	return knex('user').insert({ 'username': username, 'salt': salt, 'encrypted_password': hash })
};

function authenticate({username, password}) {
	console.log(`Authenticating user ${username}`)
	return knex('user').where({ username })
		.then(([user]) => {
			if (!user) {
				return { success: false }
			} else {
				const { hash } = saltHashPassword({
					password,
					salt: user.salt
				});
				return { success: hash === user.encrypted_password }
			}
		});
};

function saltHashPassword({ password, salt = randomString() }) {
	const hash = crypto
		.createHmac('sha512', salt)
		.update(String(password))
	return {
		salt,
		hash: hash.digest('hex')
	};
}
function randomString() {
	return crypto.randomBytes(4).toString('hex');
}

module.exports = { createUser, authenticate, saltHashPassword }
