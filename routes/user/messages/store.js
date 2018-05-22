const knex = require('knex')(require('../../../knexfile'));
const crypto = require('crypto');

function getHomeMessages({ user_email }) {
	// Fetching friends
	return knex('friends')
		.where({ 'user': user_email })
		.select('friend')
		.map((values) => {
			const friend_email = values.friend;
			const sortedArray = [ user_email, friend_email].sort().join('');
			const chatID = crypto.createHmac('sha512', sortedArray).digest('hex');
			console.log(`Chat ID: ${JSON.stringify(chatID)}`);

			// Fetch the most recent message in conversation
			const knexMessage = knex('messages')
				.where({ 'chat_id': chatID })
				.select('message', 'created_at')
				.orderBy('created_at', 'desc')
				.limit(1)
				.then(([message]) => {
					if (message == null) {
						return knex('friends')
							.select('created_at')
							.where({ 'user': user_email, 'friend': friend_email })
							.limit(1)
							.then(([date]) => { 
								return { 'message': 'You are now connected on Messenger', 'created_at': date.created_at };
							});
					}
					return message;
				});
			// Fetch user details for friend
			const knexUser = knex('user')
				.where({ 'email_address': friend_email })
				.select('first_name', 'email_address')
				.then(([user]) => { return user; });

			return Promise.all([knexMessage, knexUser]).then((data) => {
				const messageObject = data[0]; //Database data - Message
				const friendObject = data[1]; //Database Friend Details
				const combinedObjects = Object.assign(messageObject, friendObject, { 'chat_id': chatID });
				return combinedObjects;
			}).catch((error) => {
				return Promise.reject(`Internal server error: ${error}`);
			});
		}).then((data) => {
			function compare(a, b) {
				if (a.created_at < b.created_at) {
					return 1;
				}
				if (a.created_at > b.created_at) {
					return -1;
				}
				return 0;
			}
			return data.sort(compare);
		});
}

function getMessagesWithFriend({ chat_id }) {
	return knex('messages').where({ 'chat_id': chat_id }).select('sent_by', 'message_index', 'message', 'created_at');
}

function storeNewMessage({ sent_by, message, chat_id }) {
	return knex('messages')
		.where({ 'chat_id': chat_id })
		.select('message_index')
		.orderBy('created_at', 'desc')
		.limit(1)
		.then(([data]) => {
			var message_index;
			if (data == null) {
				message_index = 0;
			} else {
				message_index = data.message_index+1;
			}
			
			return knex('messages').insert({ message_index, sent_by, message, chat_id }).then(() => {
				return message_index;
			});
		});
}

module.exports = {
	getHomeMessages,
	getMessagesWithFriend,
	storeNewMessage
};