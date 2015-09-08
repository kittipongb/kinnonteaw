var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(config.url.poi.home , function (req, res) {
    res.sendFile(appRoot + '/app/index.html');
});

router.get(config.url.poi.loadAllPoi, function (req, res, next) {
    db.collection(config.mongodb.poi.name)
        .find()
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(config.url.poi.loadPoiByPoiId, function (req, res) {
	var PoiId = req.params.PoiId;
	var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(PoiId.toString());
	db.collection(config.mongodb.poi.name)
		.findOne({
			'_id' : o_id
		}, function (err, poi) {
			if (err) {
				console.log(err);
                res.send("data not found");
			} else {
                console.log(poi);
                res.json(poi);
			}
		});
});

router.post(config.url.poi.createPoi, function(req, res) {
	var Poi = req.body;
	console.log('create poi ' + poi);
    db.collection(config.mongodb.poi.name)
        .insert(Poi,
            function (error, NewPoi) {
                if (error) throw error
                res.json(NewPoi);
            });

});

router.post('/UpdatePoi', function(req, res){
	var Poi = req.body;
	var id = Poi._id;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(id.toString());
    console.log('type 1 ' + id);
    db.collection(config.mongodb.poi)
        .update({
                '_id': o_id
            }, {
                $set: {
                //    'ProductTypeNameTh': ProductType.ProductTypeNameTh,
                //    'ProductTypeNameEn': ProductType.ProductTypeNameEn,
                //    'ProductTypeNameCn': ProductType.ProductTypeNameCn
                }
            },
            function (error, UpdateStaff) {
                if (error) throw error
                // console.log(staff);
                res.json(UpdateStaff);
            });
});

router.get('/DeletePoi/:PoiId', function(req, res) {
	var PoiId = req.params.PoiId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(PoiId.toString());
    db.collection(config.mongodb.poi)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;