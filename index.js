require('app-module-path').addPath(__dirname);

const app = require('express')(),
    server = require('http').Server(app);
const bodyParser = require('body-parser');
const user = require('user/index');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/user', user);

app.get('/', (request, response) => {
    response.status(200).json({ Welcome: 'Colourhood presents the InstaMessage project' });
});
<<<<<<< HEAD
=======
app.post('/createUser', (request, response) => {
	console.log(request.body.username)
	console.log(request.body.password)

    store.createUser({ username: request.body.username, password: request.body.password })
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
>>>>>>> 80290fce7190d698d4dc19dd55d0bca03dffe013

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
