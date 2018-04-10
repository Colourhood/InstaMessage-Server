const app = require('express')(),
    server = require('http').Server(app);
const knex = require('knex')(require('./knexfile'))
const PORT = process.env.PORT || 8080;

app.get('/', (request, response) => {
    response.status(200).json({ Welcome: 'Colourhood presents the InstaMessage project' });
});
app.post('/createUser', (request, response) => {
    knex
        .createUser({
            username: request.body.username,
	    password: request.body.password
        })
	.then(() => response.sendStatus(200);)
});
app.post('/login', (request, response) => {
    knex
    	.authenticate({
	    username: request.body.username,
	    password: request.body.password
	})
	.then(({ success }) => {
	    if (success) {
		response.sendStatus(200);
	    } else {
		response.sendStatus(401);
	    }
	})
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
