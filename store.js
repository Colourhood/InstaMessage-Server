const knex = require('knex')(require('./knexfile'));

function createUser({username, password}) {
	console.log(`A new user was created ${username}`);
	return knex('user').insert({ 'username': username, 'password': password });
};

function authenticate({username, password}) {
	console.log(`Authenticating user ${username}`);
	return knex('user').where({ username })
		.then(([user]) => {
			if (!user) {
				return { success: false };
			} else {
				return { success: password === user.password };
			}
		});
};

module.exports = { createUser, authenticate }
