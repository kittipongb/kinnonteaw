var express = require('express');
var router = express.Router();

router.get(config.url.role.home, function(req, res) {
	res.sendFile(appRoot + '/app/index.html');
});

router.get('/LoadRole', function (req, res, next) {
    db.collection(config.mongodb.role.name)
        .find()
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
            //    db.close();
        });
});

router.get('/LoadRoleById/:RoleId', function (req, res) {
	var PoiId = req.params.PoiId;
	var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(PoiId.toString());
	db.collection(config.mongodb.role.name)
		.findOne({
			'_id' : o_id
		}, function (err, poi) {
			if (err) {
				console.log(err);
			} else {
				// call your callback with no error and the data
                console.log(poi);
                //     callback(null, doc);
                res.json(poi);
			}
		});
});

router.post('/CreatePoi', function(req, res) {
	var Poi = req.body;
	console.log('create poi ' + poi);
    db.collection(DB.COLLECTION_POI)
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
    db.collection(DB.COLLECTION_POI)
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
    console.log('create poi ' + PoiId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(PoiId.toString());
    db.collection(DB.COLLECTION_POI)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});
module.exports = router;