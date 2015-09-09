var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile(appRoot + '/app/index.html');
});

router.get('/LoadDistrictByProvinceId/:ProvinceId', function (req, res) {
    console.log('district.js');
    var ProvinceId = req.params.ProvinceId;
   
    var o_id = bson.BSONPure.ObjectID(ProvinceId.toString());
    db.collection(config.mongodb.district.name)
        .find({
            "$query":{'ProvinceId' : o_id}, "$orderby":{ "District": 1 }
        })
        .toArray(function (err, districts) {
            res.json(districts);
        });
});

module.exports = router;