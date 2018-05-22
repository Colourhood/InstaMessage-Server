const user = require('express').Router();
const store = require('./store');

user.post('/create', (request, response) => {
    store.createUser({
      username: request.body.username,
      password: request.body.password,
      role: request.body.role,
      organization: request.body.organization
    })
    .then(({ success }) => {
      if (success) {
        response.sendStatus(200);
      } else {
        response.sendStatus(401);
      }
    })
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
