var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile(appRoot + 'app/index.html');
});

router.get('/LoadSubDistrictByDistrictId/:DistrictId', function (req, res) {
    var DistrictId = req.params.DistrictId;

    var o_id = bson.BSONPure.ObjectID(DistrictId.toString());
    db.collection(config.mongodb.subdistrict.name)
        .find({
        	
            "$query":{'DistrictId' : o_id}, "$orderby":{ "SubDistrict": 1 }
        })
        .toArray(function (err, subdistricts) {
            res.json(subdistricts);
        });
});

router.get('/LoadSubDistrictBySubDistrictId/:SubDistrictId', function (req, res) {
    var SubDistrictId = req.params.SubDistrictId;

    var o_id = bson.BSONPure.ObjectID(SubDistrictId.toString());
    db.collection(config.mongodb.subdistrict.name)
        .find({
            "$query":{'_id' : o_id}, "$orderby":{ "SubDistrict": 1 }
        })
        .toArray(function (err, subdistricts) {
            res.json(subdistricts);
        });
});

module.exports = router;