const knex = require('knex')(require('./knexfile'));

module.exports = {
    createUser ({ username, password }) {
        console.log('Add user ${username} with password ${password}');
	return knex('user').insert({
	    username,
	    password
	});
    },
    authenticate({ username, password }) {
	console.log('Authenticating user ${username}');
	return knex('user').where({ username })
	    .then(([user]) => {
		if (!user) {
		    return { success: false };
		} else {
		    return { success: password === user.password };
		}
	    });
    }
}
