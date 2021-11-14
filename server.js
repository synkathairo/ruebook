var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
// var config = require('./config')
require('dotenv').config();
const API_KEY = process.env.API_KEY; //config.API_TOKEN;
// const token = process.env.API_KEY;
// const { response } = require('express');
// var { response } = require('express');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
	res.sendFile( __dirname + "/" + "index.html" );
	// res.send('hello world');
})
app.get('/', function (req, res) {
	res.sendFile( __dirname + "/" + "index.html" );
	// res.send('hello world');
})
app.get('/journal.html', function (req, res) {
	res.sendFile( __dirname + "/" + "journal.html" );
	// res.send('hello world');
})
app.get('/about.html', function (req, res) {
	res.sendFile( __dirname + "/" + "about.html" );
	// res.send('hello world');
})

app.post('/process_post', urlencodedParser, function (req, res) {
	// Prepare output in JSON format
	response = {
		// first_name:req.query.first_name,
		// last_name:req.query.last_name
		journalEntry:req.body.journalEntry
	};
	// response = req.query.journalEntry;
	// console.log(response);
	// console.log(JSON.stringify(response));
	// res.end(JSON.stringify(response));
	// const parseResponse = JSON.parse(response);
	// theTextWeWant = response. //myObj.journalEntry;
	theTextWeWant = Object.values(response)[0];
	console.log(theTextWeWant);
	// console.log(typeof theTextWeWant);
	// app.get('/journal.html', function (req, res) {
	// res.sendFile( __dirname + "/" + "journal.html" );
	// 	res.send(response);
	// })
	const inputJson = sentimentJson(theTextWeWant);
	const options = {
		uri: `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`,
		method: 'POST',
		json: inputJson
	};
	var responseDATA;
	// console.log(options);
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			responseDATA = response['body'];
			// console.log(response['body']);
			console.log(responseDATA);
		}
	});
	var score = responseDATA['documentSentiment']['score'];
	if(score<-0.67) {
		console.log("sad score");
		res.sendFile(__dirname + "/" + "sad.html");
	} else if(-0.67<=score<0.33) {
		console.log("neutral score");
		res.sendFile(__dirname + "/" + "neutral.html");
	} else {
		console.log("happy score");
		res.sendFile(__dirname + "/" + "happy.html");
	}
	// scoreRedirectPage(score);
	// console.log(typeof responseDATA);
	// var score = Object.values(Object.values(responseDATA)[0])[1];
	// console.log(score);
	// res.send(JSON.stringify(responseDATA));
	// res.end();
})

// function scoreRedirectPage(score) {
// 	if(score<-0.67) {
// 		console.log("sad score");
// 		res.sendFile(__dirname + "/" + "sad.html");
// 	} else if(-0.67<=score<0.33) {
// 		console.log("neutral score");
// 		res.sendFile(__dirname + "/" + "neutral.html");
// 	} else {
// 		console.log("happy score");
// 		res.sendFile(__dirname + "/" + "happy.html");
// 	}
// }

// app.post('/process_post', urlencodedParser, function (req, res) {
//    // Prepare output in JSON format
//    response = {
//       first_name:req.body.first_name,
//       last_name:req.body.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

var server = app.listen(8081, function () { // 80
	var host = server.address().address
	var port = server.address().port
	
	console.log("Example app listening at http://%s:%s", host, port)

	// const inputJson = sentimentJson("Hello World");
	// const options = {
	// 	uri: `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`,
	// 	method: 'POST',
	// 	json: inputJson
	// };
	// request(options, function (error, response, body) {
	// 	if (!error && response.statusCode == 200) {
	// 		console.log(response['body']);
	// 	}
	// });
})

function sentimentJson(text) {
	// console.log({
	// 	'document' : {
	// 		'type': 'PLAIN_TEXT',
	// 		'content': text
	// 	},
	// 	'encodingType': 'UTF8'
	// });
	return {
		'document' : {
			'type': 'PLAIN_TEXT',
			'content': text
			// 'content': 'Inception is one of the best movies of all time. I think everyone should watch it.'
		},
		'encodingType': 'UTF8'
	};
};