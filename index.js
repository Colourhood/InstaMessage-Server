const app = require('express')(),
      server = require('http').Server(app);

app.get('/', (request, response) => {
      response.status(200).json({ Home: 'Colourhood presents the log database project' });
});

server.listen(7555, () => {
      console.log('Server running on port 7555');
});