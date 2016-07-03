var express = require('express');
var app = express();
var bodyParser = require('body-parser');

global.config = require('./service/mongodb_config.json');
global.appRoot = require('app-root-path');
global.mongodb = require('mongodb');
global.bson = require('bson');
global.uuid = require('node-uuid');
global.db;
global.collection;

//app.use();
var cors = require('cors');
var index = require('./service/mongodb/route/index');
var poi = require('./service/mongodb/route/poi');
var poi_type = require('./service/mongodb/route/poi_type');
var poi_subtype = require('./service/mongodb/route/poi_subtype');
var journey = require('./service/mongodb/route/journey');
var user = require('./service/mongodb/route/user');
var staff = require('./service/mongodb/route/staff');
var role = require('./service/mongodb/route/role');
var province = require('./service/mongodb/route/province');
var district = require('./service/mongodb/route/district');
var subdistrict = require('./service/mongodb/route/subdistrict');
var schema = require('./service/mongodb/route/schema');
var rest = require('./service/mongodb/route/rest');
var oauths = require('./service/oauth/oauths');

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

var environment = process.env.NODE_ENV || '';
var port = process.env.PORT || 3030;
/*
    http = require('http'),
    fsp = require('fs-promise'),
    html = fsp.readFileSync(appRoot.path + '/app/index.html');
var log = function(entry) {
    fsp.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            if (req.url === '/') {
                log('Received message: ' + body);
            } else if (req.url = '/scheduled') {
                log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
            }

            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
            res.end();
        });
    } else {
        res.writeHead(200);
        res.write(html);
        res.end();
    }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);*/

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
/*
// Connect to Local
 
mongodb.MongoClient.connect(config.connection_url + config.collection_name, function (err, database) {
    if (err) throw err;

    db = database;
});
*/

app.get('/', function(req, res) {
  console.log('app.get / ');
    if (environment !== 'production') {
      res.sendFile('./app/index.html');

    } else {
      res.sendFile('./app/index.html');
  //    res.sendFile(path.resolve(__dirname, '../../') + '/index.html');
    }

});
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
app.listen(port, function () {
  console.log("Start server port " + port + " is OK...");
});

// Connect to MongoLab


var local_uri = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/KNT';
var mlab_uri = process.env.MONGOLAB_URI || 'mongodb://kinnonteaw:kntweb1234@ds035713.mongolab.com:35713/knt';

mongodb.MongoClient.connect(local_uri, function (err, database) {
    if (err) {
        console.log("database error");
        console.log(err, err.stack.split("\n"));
    }
    if (database) {
	    console.log("db not null ", database);
	    db = database;
	}
});


module.exports = app;