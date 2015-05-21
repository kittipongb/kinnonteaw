var express = require('express');
var router = express.Router();

router.get('/LoadPoiSubType', function (req, res, next) {
    collection = db
        .collection('PoiSubType')
        .find()
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
            //    db.close();
        });
});

// Create Poi Sub Type
router.get('/CreatePoiSubType', function (req, res, next) {
    var poisubtype = {
        PoiSubTypeName: 'TestInsert'
    };
    collection = db
        .collection('PoiSubType')
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
    collection = db
        .collection('PoiSubType')
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

module.exports = router;