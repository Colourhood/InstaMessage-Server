const messages = require('express').Router();
const store = require('./store')

messages.get('/messages/:user_email', (request, response) => {
	const user_email = request.params.user_email;

	/*Knex-mysql*/
	console.log('Get Messages endpoint was called - user: '+user_email);
	store.getHomeMessages({ user_email }).then((data) => {
		response.status(200).json({ 'messages': data });
	}).catch((error) => {
		response.status(500).json({ 'error': error });
	});
});

messages.get('/messages/:user_name/:chat_id', (request, response) => {
	const chat_id = request.params.chat_id;

	/*Knex-mysql*/
	store.getMessagesWithFriend({ chat_id }).then((data) => {
		response.status(200).json({ 'messages': data });
	});
});

messages.post('/messages', (request, response) => {
	console.log('Putting new message into database');
	const sent_by = request.body.sent_by;
	const message = request.body.message;
	const chat_id = request.body.chat_id;

	store.storeNewMessage({ sent_by, message, chat_id }).then((messageID) => {
		console.log('ID: '+messageID);
		response.status(204).send();
	});

});

module.exports = messages;