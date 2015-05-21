var express = require('express');
var app = express();
var bodyParser = require('body-parser');

global.mongodb = require('mongodb');

//app.use();
var index = require('./route/index');
var poi = require('./route/poi');
var poi_type = require('./route/poi_type');
var poi_subtype = require('./route/poi_subtype');
var review = require('./route/review');
var user = require('./route/user');
var staff = require('./route/staff');

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', index);
app.use('/poi', poi);
app.use('/poi_type', poi_type);
app.use('/poi_subtype', poi_subtype);
app.use('/user', user);
app.use('/staff', staff);
app.use('/review', review);

app.listen(3333, function () {
	console.log("Start server is OK.. ");
});


global.MONGODB_URI = 'mongodb://localhost:27017/KNT';
global.db;
global.collection;
//Define Constant 
global.DB = {
    // Table Name Product
    COLLECTION_POI: 'Poi',
    // Table Name Product Type
    COLLECTION_POI_TYPE: 'PoiType',
    // Table Name Product Category
    COLLECTION_POI_SUBTYPE: 'PoiSubType',
    COLLECTION_USER: 'User',
    COLLECTION_STAFF: 'Staff',
    COLLECTION_ROLE: 'Role'
};

mongodb.MongoClient.connect(MONGODB_URI, function (err, database) {
    if (err) throw err;

    db = database;
    //    coll = db.collection('test');
});

module.exports = app;