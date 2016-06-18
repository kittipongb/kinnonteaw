var express = require('express');
var app = express();
var bodyParser = require('body-parser');

global.config = require('../mongodb_config.json');
global.appRoot = require('app-root-path');
global.mongodb = require('mongodb');
global.bson = require('bson');
global.db;
global.collection;

//app.use();
var cors = require('cors');
var index = require('./route/index');
var poi = require('./route/poi');
var poi_type = require('./route/poi_type');
var poi_subtype = require('./route/poi_subtype');
var journey = require('./route/journey');
var user = require('./route/user');
var staff = require('./route/staff');
var role = require('./route/role');
var province = require('./route/province');
var district = require('./route/district');
var subdistrict = require('./route/subdistrict');
var schema = require('./route/schema');
var rest = require('./route/rest');
var oauths = require('../oauth/oauths');

//app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors());
app.use('/', index);
app.use('/poi', poi);
app.use('/poi_type', poi_type);
app.use('/poi_subtype', poi_subtype);
app.use('/user', user);
app.use('/staff', staff);
app.use('/journey', journey);
app.use('/role', role);
app.use('/province', province);
app.use('/district', district);
app.use('/schema', schema);
app.use('/rest', rest);
app.use('/oauths', oauths);

app.listen(config.nodejs_port, function () {
	//console.log("Start server port " + config.nodejs_port + " is OK...");
});
/*
// Connect to Local
 
mongodb.MongoClient.connect(config.connection_url + config.collection_name, function (err, database) {
    if (err) throw err;

    db = database;
});
*/


app.use( express.static( __dirname + '/') );
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
// Connect to MongoLab
 
mongodb.MongoClient.connect("mongodb://kinnonteaw:kntweb1234@ds035713.mongolab.com:35713/knt", function (err, database) {
    if (err) {
        console.log("database error");
        console.log(err, err.stack.split("\n"));
    }
    if (database) {
	    console.log("db not null " + database);
	    db = database;
	}
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + config.nodejs_port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + config.nodejs_port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

module.exports = app;