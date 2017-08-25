var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creating the schemas
var songsSchema = new Schema({
    _id : Schema.ObjectId,
    name : String,
    artist : Number,
    album : Number,
    date : Date,
    picture : String,
    genre : String,
    views : Number
});

var artistsSchema = new Schema({
    _id : Schema.ObjectId,
    name : String,
    picture : String,
    biography : String,
    views : Number
});

var albumsSchema = new Schema({
    _id : Schema.ObjectId,
    name : String,
    artist : Number,
    photo : String,
    songs : [Number],
    views : Number
});

// Create all the models using the schemas
var Songs = mongoose.model('songs', songsSchema);
var Artists = mongoose.model('artists', artistsSchema);
var Albums = mongoose.model('albums', albumsSchema);

// Export all the modules for farther use
module.exports = {
    Songs, Artists, Albums
};