require('app-module-path').addPath(__dirname);

const app = require('express')(),
    server = require('http').Server(app);
const bodyParser = require('body-parser');
const user = require('routes/user/index');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/user', user);

app.get('/', (request, response) => {
    response.status(200).json({ Welcome: 'Colourhood presents the InstaMessage project' });
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
