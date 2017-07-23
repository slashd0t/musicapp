var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');

var mongo_schemas = require('./mongo_schemas');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var app = express();
app.use('/static', express.static(__dirname + '/static'));
mongoose.connect(config.mongo_connection);

//console.log(mongo_schemas.Songs);
mongo_schemas.Songs.find({}, function (err, songs) {
    if (err) console.log(err);
    console.log(songs);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log('listening on port 8080')
});