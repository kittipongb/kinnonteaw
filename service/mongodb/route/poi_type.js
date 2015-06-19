var express = require('express');
var uuid = require('node-uuid');
var router = express.Router();

router.get('/', function (req, res, next) {
    //res.send(uuid.v4());
    res.sendFile(appRoot + '/app/index.html');
});

router.get('/LoadPoiType', function (req, res, next) {
    db.collection(DB.COLLECTION_POI_TYPE)
        .find()
        .toArray(function (err, poi_types) {
            console.log(poi_types);
            res.json(poi_types);
        });
});

router.get('/LoadPoiTypeById/:PoiTypeId', function (req, res) {
	var PoiTypeId = req.params.PoiTypeId;
	var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(PoiTypeId.toString());
	db.collection(DB.COLLECTION_POI_TYPE)
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
router.get('/CreatePoiType', function (req, res, next) {
    var poitype = {
        PoiTypeName: 'TestInsertPoiType'
    };
    collection = db
        .collection(DB.COLLECTION_POI_TYPE)
        .insert(poitype, function (error, result) {
            if (error) throw error

            console.log("Insert poi type success ?? " + result[0]._id);
        });
});

router.post('/UpdatePoiType/:PoiTypeId', function(req, res){
    var PoiType = req.body;
    var id = PoiType._id;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(id.toString());
    console.log('type 1 ' + id);
    db.collection(DB.COLLECTION_POI_TYPE)
        .update({
                '_id': o_id
            }, {
                $set: {
                //    'ProductTypeNameTh': ProductType.ProductTypeNameTh,
                //    'ProductTypeNameEn': ProductType.ProductTypeNameEn,
                //    'ProductTypeNameCn': ProductType.ProductTypeNameCn
                }
            },
            function (error, UpdatePoiType) {
                if (error) throw error
                res.json(UpdatePoiType);
            });
});

router.get('/DeletePoi/:PoiTypeId', function(req, res) {
    var PoiTypeId = req.params.PoiTypeId;
    console.log('create Poi Type ' + PoiTypeId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(PoiTypeId.toString());
    db.collection(DB.COLLECTION_POI_TYPE)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});
module.exports = router;