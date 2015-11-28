var PORT = process.env.PORT || 3000,
	MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017";

var express = require('express'),
	server = express(),
	ejs = require('ejs'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	expressLayouts = require('express-ejs-layouts'),
	morgan = require('morgan'),
	mongoose = require('mongoose');
	session = require('express-session');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'FinalProjectGeneral@gmail.com',
      pass: 'generalassembly'
  }
});


server.set('views', './views');
server.set('view engine', 'ejs');

server.use(session({
	secret: "Some passPharase to encript", 
	resave: true,
	saveUnintialized:  false
}));
 
server.use(morgan('short'));

server.use(express.static("./public"));

server.use(expressLayouts);
  
server.use(bodyParser.urlencoded({extended: true}));
server.use(methodOverride('_method'));

var messageController = require('./controllers/messages.js');
server.use('/messages', messageController);

server.get('/', function (req, res) {
	res.render('welcome');
});

server.get('/send', function(req, res) {
  var mailOptions = {
    from: 'Final Project WDI <FinalProjectGeneral.com>', // sender address
    to: req.query.to, // list of receivers
    subject: req.query.subject, // Subject line
    text: req.query.text, // plaintext body
    html: req.query.text // html body
  };

  console.log("req",req.query);

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ');
  });
 
}); //End of server.get

/////////////////////////////////////////////////
mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function () {
	console.log("Database errors");
});

db.once('open', function () {
	console.log("Database up and running");
	server.listen(PORT, function () {
		console.log("server up and running");
	})
})