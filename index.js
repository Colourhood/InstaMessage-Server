const app = require('express')(),
      server = require('http').Server(app);
const knex = require('knex')(require('./knexfile'))
const PORT = process.env.PORT || 8080;

app.get('/', (request, response) => {
      response.status(200).json({ Welcome: 'Colourhood presents the InstaMessage project' });
});

server.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
});