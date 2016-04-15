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
    var o_id = bson.BSONPure.ObjectID(PoiId.toString());
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
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Poi.CreateDate = createDate;
    db.collection(config.mongodb.poi.name)
        .insert(Poi,
            function (error, NewPoi) {
                if (error) throw error
                res.json(NewPoi);
            });

});

router.post('/UpdateReplacePoi', function(req, res){
	var Poi = req.body;
	var id = Poi._id;
    var o_id = bson.BSONPure.ObjectID(id.toString());
    
    db.collection(config.mongodb.poi.name)
        .update({
                '_id': o_id
            }, 
            Poi
            , function (error, UpdatePoi) {
                if (error) throw error
                res.json(UpdatePoi);
            });
});

router.post('/UpdateMergePoi', function(req, res) {
    var Poi = req.body;
    var id = Poi._id;
    var o_id = bson.BSONPure.ObjectID(id.toString());
    


});

router.get(config.url.poi.deletePoiByPoiId, function(req, res) {
	var PoiId = req.params.PoiId;
    var BSON = mongodb.BSONPure;
    var o_id = bson.BSONPure.ObjectID(PoiId.toString());

    db.collection(config.mongodb.poi.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;