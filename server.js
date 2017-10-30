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
var conn = process.env.MONGODBURL_MUSICAPP;
console.log('conn:',conn);
mongoose.connect(conn);
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
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser());

app.use('/', index);

/**
 * This function return the whole dataset of a choosen model
 * It requires a name of a model
 * example: '/getAll?model=Songs'
 */
app.get('/getAll', (req, res) => {
    validateTemplate(req.query, ['model'], (err, query) => {
        sendIncaseOfError(err, res);

        Schemas[query.model].find({}, function (err, data) {
            sendIncaseOfError(err, res);
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
        sendIncaseOfError(err, res);

        Schemas[query.model].find({}, null, {
            sort: {
                views: -1
            }
        }, function (err, data) {
            sendIncaseOfError(err, res);
            res.send(data.slice(0, query.n));
        });
    });
});

/**
 * This function return an object from the database by it's ID
 * It requires a name of a model and the ID
 * example: '/getById?model=Songs&id=59b2ee47ef53dd8c2fac3063'
 */
app.get('/getById', (req, res) => {
    validateTemplate(req.query, ['model', 'id'], (err, query) => {
        sendIncaseOfError(err, res);
        Schemas[query.model].find({
            _id: query.id
        }, function (err, data) {
            sendIncaseOfError(err, res);
            res.send(data);
        });
    });
});

/**
 * This function returns an album model from the database by it's ID
 * and adds all the songs that are connected to this album in an array called 'songs'
 * It requires the ID of the album
 * example: '/getAlbumWithSongs?id=59b2ee47ef53dd8c2fac3063'
 */
app.get('/getAlbumWithSongs', (req, res) => {
    validateTemplate(req.query, ['id'], (err, query) => {
        sendIncaseOfError(err, res);

        Schemas['Albums'].findOne({
            _id: query.id
        }, function (err, album) {
            sendIncaseOfError(err, res);

            if (album) {
                Schemas['Songs'].find({
                    album: query.id
                }, function (err, songs) {
                    sendIncaseOfError(err, res);

                    res.send(Object.assign({}, album.toObject(), {
                        songs
                    }));
                });
            }
        });
    });
});

/**
 * This function returns all the albums from the database
 * and adds all the songs that are connected to each album in an array called 'songs'
 * example: '/getAllAlbumsWithSongs
 */
app.get('/getAllAlbumsWithSongs', (req, res) => {
    Schemas['Albums'].aggregate([{
        "$lookup": {
            "from": "songs",
            "localField": "_id",
            "foreignField": "album",
            "as": "songs"
        }
    }], function (err, albums) {
        sendIncaseOfError(err, res);
        res.send(albums);
    });
});

/**
 * This function returns an album model from the database by it's ID
 * and adds all the songs that are connected to this album in an array called 'songs'
 * It requires the ID of the artist
 * example: '/getArtistWithAlbums?id=59b2ee47ef53dd8c2fac3063'
 */
app.get('/getArtistWithAlbums', (req, res) => {
    validateTemplate(req.query, ['id'], (err, query) => {
        sendIncaseOfError(err, res);
        Schemas['Artists'].findOne({
            _id: query.id
        }, function (err, artist) {
            sendIncaseOfError(err, res);

            if (artist) {
                Schemas['Albums'].find({
                    artist: query.id
                }, function (err, albums) {
                    sendIncaseOfError(err, res);

                    res.send(Object.assign({}, artist.toObject(), {
                        albums
                    }));
                });
            }
        });
    });
});

/**
 * This function returns a song model from the database by it's ID
 * and adds the object of it's artist and album by their id
 * It requires the ID of the song
 * example: '/getFullDetailSong?id=59b2ee47ef53dd8c2fac3063'
 */
app.get('/getFullDetailSong', (req, res) => {
    validateTemplate(req.query, ['id'], (err, query) => {
        sendIncaseOfError(err, res);
        Schemas['Songs'].findOne({
            _id: query.id
        }, function (err, song) {
            sendIncaseOfError(err, res);

            if (song) {
                Schemas['Albums'].findOne({
                    _id: song.album
                }, function (err, album) {
                    sendIncaseOfError(err, res);
                    Schemas['Artists'].findOne({
                        _id: song.artist
                    }, function (err, artist) {
                        sendIncaseOfError(err, res);

                        res.send(Object.assign({}, song.toObject(), {
                            album
                        }, {
                            artist
                        }));
                    });
                });
            }
        });
    });
});

/**
 * This function returns songs by album, artist and genre.
 * It doesn't have to receive each and every one of them - all are optional
 * examples:
 * /getSongs?album=59b2ee47ef53dd8c2fac3063&artist=59b2ee47ef53dd8c2fac3063
 * /getSongs?genre=rock&album=59b2ee47ef53dd8c2fac3063
 * /getSongs?artist=59b2ee47ef53dd8c2fac3063
 */
app.get('/getSongs', (req, res) => {
    let searchParams = {
        album,
        artist,
        genre
    } = req.query;

    Schemas['Songs'].find(searchParams, function (err, songs) {
        sendIncaseOfError(err, res);
        res.send(songs);
    });
});

/**
 * This functions return an array with all the genres that are present on the songs
 * example: /getAllGenres
 */
app.get('/getAllGenres', (req, res) => {
    Schemas['Songs'].distinct('genre', function (err, genres) {
        sendIncaseOfError(err, res);
        res.send(genres);
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
        sendIncaseOfError(err, res);
        const model_final_data = Object.assign({}, query.model_data, {
            views: 0
        }); // Set views to zero
        Schemas[query.model].create(query.model_data, function (err, data) {
            sendIncaseOfError(err, res);
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
        sendIncaseOfError(err, res);

        Schemas[query.model].findOneAndUpdate({
                _id: query.id
            }, query.model_data, {
                upsert: true
            },
            function (err, doc) {
                sendIncaseOfError(err, res);
                res.send("succesfully saved");
            }
        );
    });
});

app.put('/remove', (req, res) => {
    validateTemplate(req.body, ['model', 'id'], (err, query) => {
        sendIncaseOfError(err, res);

        Schemas[query.model].remove({
            _id: query.id
        }, function (err, data) {
            sendIncaseOfError(err, res);
            res.send("succesfully removed");
        });
    });
})


// catch-all routes
app.get('*', function(req, res) {
  res.sendfile('./views/index.html')
})

/********** Useful Functions **********/

function sendIncaseOfError(err, res) {
    if (err) {
        console.log(err);
        res.send(500, {
            error: err
        });
    }
}

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
