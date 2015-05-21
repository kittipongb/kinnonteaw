var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send(uuid.v4());
});

router.get('/LoadPoiType', function (req, res, next) {
    collection = db
        .collection('PoiType')
        .find()
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
            //    db.close();
        });
});

// Create Poi Type
router.get('/CreatePoiType', function (req, res, next) {
    var poitype = {
        PoiTypeName: 'TestInsertPoiType'
    };
    collection = db
        .collection(DB.POI_TYPE)
        .insert(poitype, function (error, result) {
            if (error) throw error

            console.log("Insert poi type success ?? " + result[0]._id);
        });
});

module.exports = router;