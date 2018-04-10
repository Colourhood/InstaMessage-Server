const app = require('express')(),
    server = require('http').Server(app);
const bodyParser = require('body-parser');
const store = (require('./store'));
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.status(200).json({ Welcome: 'Colourhood presents the InstaMessage project' });
});
app.post('/createUser', (request, response) => {
    store
        .createUser({
            username: request.body.username,
	    password: request.body.password
        })
	.then(() => response.sendStatus(200));
});
app.post('/login', (request, response) => {
    store
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
