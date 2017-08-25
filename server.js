var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

/********** Config Init **********/
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var index = require('./routes/index');

var app = express();

/********** Database Init **********/
mongoose.connect(config.mongo_connection);
var Schemas = require('./mongo_schemas'); // Object that contains Songs, Albums and Artists
var { Songs, Albums, Artists } = require('./mongo_schemas');

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

/**
 * This function return the whole dataset of a choosen model
 * It requires a name of a model
 * example: '/getAll?model=Songs'
 */
app.get('/getAll', (req, res) => {
    validateTemplate(req, res, ['model'], (query) => {
        Schemas[query.model].find({}, function (err, data) {
            if (err) throw err;
            res.send(data);
        });
    });
});

/**
 * This function return the whole dataset of a choosen model
 * It requires a name of a model
 * example: '/getAll?model=Songs&n=10'
 */
app.get('/getNMostViewed', (req, res) => {
    validateTemplate(req, res, ['model', 'n'], (query) => {
        Schemas[query.model].find({}, null, { sort: { views: -1 } }, function (err, data) {
            if (err) throw err;
            res.send(data.slice(0, query.n));
        });
    });
});

/**
 * This function return an object from the dataset by it's ID
 * It requires a name of a model and the ID
 * example: '/getAll?model=Songs&id=1'
 */
app.get('/getById', (req, res) => {
    validateTemplate(req, res, ['model', 'id'], (query) => {
        Schemas[query.model].find({ _id: query.id }, function (err, data) {
            if (err) throw err;
            res.send(data);
        });
    });
});

/********** Useful Functions **********/

// Object of all the query attributes and the functions that will be checking them later
const queryAttributes = {
    model: function (model) {
        if (!(model in Schemas)) {
            console.log('the model doesn\'t exist in database');
            return false;
        }

        return true;
    },
    id: function (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('ID should be of mongo ObjectID type');
            return false;
        }

        return true;
    },
    n: function (n) {
        if (isNaN(n)) {
            console.log('N should be a number');
            return false;
        }

        return true;
    }
}

/**
 * Checks if the parameters are valid and if so callbacks to the function
 */
function validateTemplate(req, res, params, callback) {
    if (validQuery(req.query, params)) {
        callback(req.query);
    } else {
        res.send('error');
    }
}

/**
 * Receive query of a request and checks if they are acceptable
 */
function validQuery(query, params) {
    // Runs on all the query attributes and only if everyone passes
    // the requirements proceed with the request 
    return Object.keys(queryAttributes).every((val) => {
        return basicQueryValidation(val, query, params, queryAttributes[val]);
    });
}

/*
* Checks if the attribute is in the params needed for the request
* if it isn't then return true 
* if it is check if it is indeed on the request
* if it is use the specific validation functions from the queryAttributes object
*/
function basicQueryValidation(attr, query, params, callback) {
    // If this attributes needs to be checked in this specific request
    if (params.includes(attr)) {
        if (!(attr in query)) {
            console.log(attr + ' doesn\'t exist on the query');
            return false;
        }

        return callback(query[attr]);
    }

    return true;
}

app.listen(config.port, function () {
    console.log('Server started on port ' + config.port);
});