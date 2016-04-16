var express = require('express');
var uuid = require('node-uuid');
var router = express.Router();

router.get('/', function (req, res, next) {
    //res.send(uuid.v4());
    res.sendFile(appRoot + '/app/index.html');
});

router.get('/LoadPoiType', function (req, res, next) {
    db.collection(config.mongodb.poi_type.name)
        .find()
        .toArray(function (err, poi_types) {
            console.log(poi_types);
            res.json(poi_types);
        });
});

router.get('/LoadPoiTypeById/:PoiTypeId', function (req, res) {
	var PoiTypeId = req.params.PoiTypeId;
	
    var o_id = bson.BSONPure.ObjectID(PoiTypeId.toString());
	db.collection(config.mongodb.poi_type.name)
		.findOne({
			'_id' : o_id
		}, function (err, poi_type) {
			if (err) {
				console.log(err);
			} else {
				// call your callback with no error and the data
                console.log(poi_type);
                //     callback(null, doc);
                res.json(poi_type);
			}
		});
});

// Create Poi Type
router.post('/CreatePoiType', function (req, res, next) {
    var PoiType = req.body;
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    PoiType.CreateDate = createDate;
    PoiType.UpdateDate = createDate;
    collection = db
        .collection(config.mongodb.poi_type.name)
        .insert(poitype, function (error, result) {
            if (error) throw error

            console.log("Insert poi type success ?? " + result[0]._id);
        });
});

router.post('/UpdatePoiType', function(req, res){
    var PoiType = req.body;
    var id = PoiType._id;

    var o_id = bson.BSONPure.ObjectID(id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    db.collection(config.mongodb.poi_type.name)
        .update({
                '_id': o_id
            }, 
            PoiType
            , function (error, UpdatePoiType) {
                if (error) throw error
                res.json(UpdatePoiType);
            });
});

router.get('/DeletePoiType/:PoiTypeId', function(req, res) {
    var PoiTypeId = req.params.PoiTypeId;
    console.log('create Poi Type ' + PoiTypeId);
    var o_id = bson.BSONPure.ObjectID(PoiTypeId.toString());
    db.collection(config.mongodb.poi_type.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});
module.exports = router;