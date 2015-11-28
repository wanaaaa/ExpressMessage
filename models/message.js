var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageSchema = Schema ({
	author: {type: String, required: false},
	content: {type: String, required: false},
	comment: {type: String, required: false}
});

var MessageModel = mongoose.model('MessageModel', MessageSchema);

module.exports = MessageModel;

