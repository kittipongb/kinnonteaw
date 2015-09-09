var express = require('express');
var router = express.Router();

router.get('/LoadPoiSubType', function (req, res, next) {
    db.collection(config.mongodb.poi_subtype.name)
        .find()
        .toArray(function (err, poi_subtypes) {
            console.log(poi_subtypes);
            res.json(poi_subtypes);
            //    db.close();
        });
});

router.get('/LoadPoiSubTypeById/:PoiSubTypeId', function (req, res) {
    var PoiSubTypeId = req.params.PoiSubTypeId;

    var o_id = bson.BSONPure.ObjectID(PoiSubTypeId.toString());
    db.collection(config.mongodb.poi_subtype.name)
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
    var PoiSubType = req.body;

    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    PoiSubType.CreateDate = createDate;
    PoiSubType.UpdateDate = createDate;
    db.collection(config.mongodb.poi_subtype.name)
        .insert(poisubtype, function (error, result) {
            if (error) throw error

            console.log("Insert poi sub type success ?? " + result[0]._id);
        });
});


// Update Poi Sub Type
router.get('/UpdatePoiSubType', function (req, res, next) {
    var PoiSubType = req.body;
    var id = PoiSubType._id;
    var o_id = bson.BSONPure.ObjectID(id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    db.collection(config.mongodb.poi_subtype.name)
        .update({
                '_id': o_id
            }, {
                $set: {
                    'PoiSubTypeNameTh': PoiSubType.PoiSubTypeNameTh,
                    'PoiSubTypeNameEn': PoiSubType.PoiSubTypeNameEn,
                    'PoiSubTypeNameJp': PoiSubType.PoiSubTypeNameJp,
                    'UpdateDate' : updateDate
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
    var o_id = bson.BSONPure.ObjectID(PoiSubTypeId.toString());
    db.collection(config.mongodb.poi_subtype.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;