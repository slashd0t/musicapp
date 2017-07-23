var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creating the schemas
var songsSchema = new Schema({
    _id : Number,
    name : String,
    artist : Number,
    album : Number,
    date : Date,
    picture : String,
    genre : String,
    views : Number
});

// Create all the models using the schemas
var Songs = mongoose.model('Songs', songsSchema);
// var Artists = mongoose.model('Artists', artistsSchema);
// var Albums = mongoose.model('Albums', albumsSchema);

module.exports = {
    Songs
};