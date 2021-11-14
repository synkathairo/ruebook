var express = require('express');
var app = express();
var bodyParser = require('body-parser');
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
	console.log(response);
	res.end(JSON.stringify(response));
	// app.get('/journal.html', function (req, res) {
	// 	res.sendFile( __dirname + "/" + "journal.html" );
	// 	res.send(response);
	// })
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
})