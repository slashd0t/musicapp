// ***** Requires
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');

// ***** Config Init
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// ***** Express Init
var app = express();
app.use('/static', express.static(__dirname + '/static'));

// ***** Mongoose Init
mongoose.connect(config.mongo_connection);
var { Songs, Albums, Artists } = require('./mongo_schemas');

// ***** Routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// ***** Run Server
app.listen(config.port, function () {
    console.log('listening on port ' + config.port)
});