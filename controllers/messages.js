var express = require('express'),
	router = express.Router(),
	Message = require('../models/message.js');

router.get('/', function(req, res) {
	console.log("asf");
	res.redirect(301, '/messages/index')
	// res.render('messages/index');
});

router.post('/index', function(req, res) {
	var newMessage = new Message(req.body.message);
	console.log("This is req.body.to ===========:  ",req.body.message);
	newMessage.save(function(err, messageObject) {
		if (err) {
			console.log(err)
		} else {
			console.log("I am saving =====:  ", messageObject);
			res.redirect(301, '/messages/index');
		}
	})
})

router.get('/index', function (req, res) {
	console.log("getting index=========");
	Message.find( {}, function (err, messageContents) {
		if (err) {
			console.log(err);
		} else {
			res.render('messages/index', {
				messageObjects: messageContents});
		};//else
	});
});


router.get('/:id/edit', function (req, res) {
	Message.findOne({
		_id: req.params.id
	}, function (err, foundTopic) {
		if (err) {
			console.log('Bad user');
			res.end();
		} else {
			res.render('messages/edit', { 
				messageInfos: foundTopic
			});
			console.log(foundTopic)
		};
	});	
});





router.patch('/:id', function(req, res) {
	console.log("patch comming===", "req.params.message====", req.params.message );
	console.log("patch comming===", "req   ====", req );

	Message.findOne({
		_id: req.params.id
	}, function(err, foundMessage) {
		console.log("foundMessage==========", foundMessage);
		if (err) {
			console.log(err)
		} else {
			foundMessage.update(req.body.message, function (errTwo, message) {
				console.log('req.body.message========================', req.body.message)
				if (errTwo) {
					console.log("err update");
				} else {
					console.log("updated===================", message);
					res.redirect(302, '/messages/index')
				};
			});
		};
	});
});

router.delete('/:id', function (req, res) {
	console.log(req.params.id);
	console.log("I am deleting");
	Message.remove({
		_id: req.params.id
	}, function (err) {
		if (err) {
			console.log("Delete messages err")
		} else {
			res.redirect(302, '/messages/index');
		};
	});
});

module.exports = router;