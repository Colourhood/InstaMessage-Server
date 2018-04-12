const knex = require('knex')(require('knexfile'));

function createUser({username, password}) {
	return knex('user').insert({ username, password });
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
