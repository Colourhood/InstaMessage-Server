const user = require('express').Router();

user.post('/create', (request, response) => {
    store.createUser({
      username: request.body.username,
      password: request.body.password
    })
    .then(() => response.sendStatus(200));
});

user.post('/login', (request, response) => {
    store.authenticate({
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

module.exports = user;
