module.exports = {
    client: 'pg',
    version: '10.3',
    connection: {
        host : 'ec2-54-243-54-6.compute-1.amazonaws.com',
        user : 'vagvrnenkbfqdn',
        password : '8110d1eaa18b65447502f4e92f9ffb0c7094bf8a50fa5c1e242e59b620d81419',
        database : 'dd9d8ivrp4kc0h',
        ssl: true
    },
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
