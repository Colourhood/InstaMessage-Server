const organizations = require('express').Router();
const store = require('./store');

organizations.get('/all', (request, response) => {
    store.all()
        .then((info) => {
            response.status(200).json({ 'data': info });
        }).catch((error) => {
            response.status(500).json({ 'error': error });
        });
});

organizations.get('/:name', (request, response) => {
    let name = request.params.name

    store.dataFor(name)
        .then((info) => {
            response.status(200).json({ 'data': info });
        }).catch((error) => {
            response.status(500).json({ 'error': error });
        });
});


module.exports = organizations;
