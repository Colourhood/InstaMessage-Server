const app = require('express')(),
    server = require('http').Server(app);
const bodyParser = require('body-parser');

// Routes
const user = require('./routes/user/index');
const organizations = require('./routes/organizations/index');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/user', user);
app.use('/organizations', organizations);

app.get('/', (request, response) => {
    response.status(200).json({ Welcome: 'Colourhood presents the InstaMessage project' });
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
