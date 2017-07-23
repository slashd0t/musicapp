var express = require('express');
var mongoose = require('mongoose');

var app = express();
app.use('/static', express.static(__dirname + '/static'));
mongoose.connect('mongodb://user:123456@ds035036.mlab.com:35036/musicapp');

// var Schema = mongoose.Schema;

// // create a schema
// var messageSchema = new Schema({
//   _id: String,
//   template: Number,
//   duration: Number,
//   content: [String],
//   images: [String],
//   scheduling: {
//       validFrom: Date,
//       validTo: Date,
//       days: [{
//           number: Date,
//           start: String,
//           end: String
//       }]
//   },
//   screens: [Number]
// });

// // the schema is useless so far
// // we need to create a model using it
// var Messages = mongoose.model('messages', messageSchema);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log('listening on port 8080')
});