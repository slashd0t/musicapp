/********** Requires **********/
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');

/********** Config Init **********/
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

/********** Express Init **********/
var app = express();
app.use('/static', express.static(__dirname + '/static'));

/********** Database Init **********/
mongoose.connect(config.mongo_connection);
var Schemas = require('./mongo_schemas'); // Object that contains Songs, Albums and Artists
var { Songs, Albums, Artists } = require('./mongo_schemas');

/********** Routes **********/
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

/**
 * This functions return the whole dataset of a choosed model
 * It requires a name of a model
 * example: '/getAll?model=Songs'
 */
app.get('/getAll', (req, res) => {
    // If the model is in the schemas
    if (validQuery(req.query)) {
        Schemas[req.query.model].find({}, function (err, data) {
            if (err) throw err;
            res.send(data);
        });
    } else {
        res.send("No such model");
    }
});

/**
 * This functions return an object from the dataset by it's ID
 * It requires a name of a model and the ID
 * example: '/getAll?model=Songs&id=1'
 */
app.get('/getById', (req, res) => {
    if (validQuery(req.query)) {
        Schemas[req.query.model].find({ _id: req.query.id }, function (err, data) {
            if (err) throw err;
            res.send(data);
        });
    } else {
        res.send("error");
    }
});

/********** Useful Functions **********/
function validQuery(query) {
    if (!(query.model in Schemas)) {
        console.log("Model does not exist");
        return false;
    }
    // If ID exists on the query and is not a number
    if (query.id && isNaN(query.id)) {
        console.log("ID should be a number");
        return false;
    }

    return true;
}


/********** Server **********/
app.listen(config.port, function () {
    console.log('listening on port ' + config.port)
});