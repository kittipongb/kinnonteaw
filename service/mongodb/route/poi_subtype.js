var express = require('express');
var router = express.Router();

router.get('/LoadPoiSubType', function (req, res, next) {
    db.collection(DB.COLLECTION_POI_SUBTYPE)
        .find()
        .toArray(function (err, poi_subtypes) {
            console.log(poi_subtypes);
            res.json(poi_subtypes);
            //    db.close();
        });
});

router.get('/LoadPoiSubTypeById/:PoiSubTypeId', function (req, res) {
    var PoiSubTypeId = req.params.PoiSubTypeId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(PoiSubTypeId.toString());
    db.collection(DB.COLLECTION_POI_SUBTYPE)
        .findOne({
            '_id' : o_id
        }, function (err, poi_subtype) {
            if (err) {
                console.log(err);
            } else {
                // call your callback with no error and the data
                console.log(poi_subtype);
                //     callback(null, doc);
                res.json(poi_subtype);
            }
        });
});

// Create Poi Sub Type
router.get('/CreatePoiSubType', function (req, res, next) {
    var poisubtype = {
        PoiSubTypeName: 'TestInsert'
    };
    db.collection(DB.COLLECTION_POI_SUBTYPE)
        .insert(poisubtype, function (error, result) {
            if (error) throw error

            console.log("Insert poi sub type success ?? " + result[0]._id);
        });
});


// Update Poi Sub Type
router.get('/UpdatePoiSubType', function (req, res, next) {
    var id = '552e30e5a15b8e58197ff0b3';
    //  ObjectId("552e30e5a15b8e58197ff0b3")
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(id);
    db.collection(DB.COLLECTION_POI_SUBTYPE)
        .update({
                '_id': o_id
            }, {
                $set: {
                    'PoiSubTypeName': 'WOOOOOOOOOOOOOO'
                }
            },
            function (error, result) {
                if (error)
                    throw error
                console.log("update poi sub type success ?? " + result);
            });
});

router.get('/DeletePoiSubType/:PoiSubTypeId', function (req, res) {
    var PoiSubTypeId = req.params.PoiSubTypeId;
    console.log('create poi subtype ' + PoiSubTypeId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(PoiSubTypeId.toString());
    db.collection(DB.COLLECTION_POI_SUBTYPE)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;