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
var {
    Songs,
    Albums,
    Artists
} = require('./mongo_schemas');

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use('/', index);

/**
 * This function return the whole dataset of a choosen model
 * It requires a name of a model
 * example: '/getAll?model=Songs'
 */
app.get('/getAll', (req, res) => {
    validateTemplate(req.query, ['model'], (err, query) => {
        if (err) res.send(err);
        Schemas[query.model].find({}, function (err, data) {
            if (err) return res.send(500, {
                error: err
            });
            res.send(data);
        });
    });
});

/**
 * This function return the whole dataset of a choosen model
 * It requires a name of a model
 * example: '/getNMostViewed?model=Songs&n=10'
 */
app.get('/getNMostViewed', (req, res) => {
    validateTemplate(req.query, ['model', 'n'], (err, query) => {
        Schemas[query.model].find({}, null, {
            sort: {
                views: -1
            }
        }, function (err, data) {
            if (err) res.send(err);
            if (err) return res.send(500, {
                error: err
            });
            res.send(data.slice(0, query.n));
        });
    });
});

/**
 * This function return an object from the dataset by it's ID
 * It requires a name of a model and the ID
 * example: '/getById?model=Songs&id=1'
 */
app.get('/getById', (req, res) => {
    validateTemplate(req.query, ['model', 'id'], (err, query) => {
        console.error(req + "/n" +err);
        if (err) res.send(err);
        Schemas[query.model].find({
            _id: query.id
        }, function (err, data) {
            if (err) return res.send(500, {
                error: err
            });
            res.send(data);
        });
    });
});

/**
 * This function inserts a new object to the database
 * It requires a name of a model and the model itself
 * this is a put request
 * Object sent in ajax should look like : 
 * { model: 'Songs',
     model_data: { 
        name: 'try',
        artist: 1,
        album: 1,
        date: '2017-08-29T16:31:42.138Z',
        picture: '',
        genre: 'Test' } 
    }
 */
app.put('/insert', (req, res) => {
    validateTemplate(req.body, ['model'], (err, query) => {
        if (err) res.send(err);
        const model_final_data = Object.assign({}, query.model_data, {
            views: 0
        }); // Set views to zero
        Schemas[query.model].create(query.model_data, function (err, data) {
            if (err) return res.send(500, {
                error: err
            });
            res.send('success');
        });
    });
});

/**
 * This function updates an object in the database
 * It requires a name of a model, id, and the updated data
 * this is a put request
 * Object sent in ajax should look like : 
 * { model: 'Songs',
     id: '59a052c5ef53dd8c2fe2b402',
     model_data: { 
        name: 'try2' } 
    }
 */
app.put('/update', (req, res) => {
    validateTemplate(req.body, ['model', 'id'], (err, query) => {
        if (err) res.send(err);
        Schemas[query.model].findOneAndUpdate(
            query.id, query.model_data, {
                upsert: true
            },
            function (err, doc) {
                if (err) return res.send(500, {
                    error: err
                });
                return res.send("succesfully saved");
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
function validateTemplate(data, params, callback) {
    if (validQuery(data, params)) {
        callback(null, data);
    } else {
        callback('Failed validating query', null);
    }
}

/**
 * Receive query of a request and checks if they are acceptable
 */
function validQuery(data, params) {
    // Runs on all the query attributes and only if everyone passes
    // the requirements proceed with the request 
    return Object.keys(queryAttributes).every((val) => {
        return basicQueryValidation(val, data, params, queryAttributes[val]);
    });
}

/*
 * Checks if the attribute is in the params needed for the request
 * if it isn't then return true 
 * if it is check if it is indeed on the request
 * if it is use the specific validation functions from the queryAttributes object
 */
function basicQueryValidation(attr, data, params, callback) {
    // If this attributes needs to be checked in this specific request
    if (params.includes(attr)) {
        if (!(attr in data)) {
            console.log(attr + ' doesn\'t exist on the query');
            return false;
        }

        return callback(data[attr]);
    }

    return true;
}

const server = app.listen(config.port, function () {
    console.log('Server started on port ' + config.port);
});


//// Socket.io 

var io = require('socket.io')(server);

io.on('connection', (socket) => {
    // console.log('user connected');

    // socket.on('disconnect', function () {
    //     console.log('user disconnected');
    // });

    socket.on('add-message', (message) => {
        io.emit('message', {
            type: 'new-message',
            text: message
        });
    });
});