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
    res.sendFile(__dirname + "/static/src/index.html");
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

var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');

// Webpack Config
var webpackConfig = {
    entry: {
        'main': './src/main.browser.ts',
    },

    output: {
        publicPath: '',
        path: path.resolve(__dirname, './dist'),
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            path.resolve(__dirname, './src'),
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'
                ]
            },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
            { test: /\.html$/, loader: 'raw-loader' }
        ]
    }

};


// Our Webpack Defaults
var defaultConfig = {
    devtool: 'source-map',

    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: [ '.ts', '.js' ],
        modules: [ path.resolve(__dirname, 'node_modules') ]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },

    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
