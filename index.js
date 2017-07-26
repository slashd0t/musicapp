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
    validateTemplate(req, res, (query) => {
        Schemas[query.model].find({}, function (err, data) {
            if (err) throw err;
            res.send(data);
        });
    });
});

/**
 * This functions return an object from the dataset by it's ID
 * It requires a name of a model and the ID
 * example: '/getAll?model=Songs&id=1'
 */
app.get('/getById', (req, res) => {
    validateTemplate(req, res, (query) => {
        Schemas[query.model].find({ _id: query.id }, function (err, data) {
            if (err) throw err;
            res.send(data);
        });
    });
});

/********** Useful Functions **********/

/**
 * Checks if the parameters are valid and if so callbacks to the function
 */
function validateTemplate(req, res, callback) {
    if (validQuery(req.query)) {
        callback(req.query);
    } else {
        res.send("error");
    }
}

/**
 * Receive query of a request and checks if they are acceptable
 */
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