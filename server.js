var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
// const { response } = require('express');
var app = express();
// var config = require('./config')
// require('dotenv').config();
var API_KEY = process.env.API_KEY; //config.API_TOKEN;
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
	res.end(JSON.stringify(response));
	// const parseResponse = JSON.parse(response);
	// theTextWeWant = response. //myObj.journalEntry;
	theTextWeWant = Object.values(response)[0];
	console.log(theTextWeWant);
	// console.log(typeof theTextWeWant);
	// app.get('/journal.html', function (req, res) {
	// 	res.sendFile( __dirname + "/" + "journal.html" );
	// 	res.send(response);
	// })
	const inputJson = sentimentJson(theTextWeWant);
	const options = {
		uri: `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`,
		method: 'POST',
		json: inputJson
	};
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(response['body']);
		}
	});
})

// app.post('/process_post', urlencodedParser, function (req, res) {
//    // Prepare output in JSON format
//    response = {
//       first_name:req.body.first_name,
//       last_name:req.body.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

var server = app.listen(8081, function () {
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
	return {
		'document' : {
			'type': 'PLAIN_TEXT',
			'content': text
			// 'content': 'Inception is one of the best movies of all time. I think everyone should watch it.'
		},
		'encodingType': 'UTF8'
	};
};