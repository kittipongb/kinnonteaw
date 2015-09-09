var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.sendFile(appRoot + '/app/index.html');
});

router.get('/LoadProvince', function (req, res) {
    db.collection(config.mongodb.province.name)
        .find({
        	 "$query":{}, "$orderby":{ "Province": 1 }
        })
        .toArray(function (err, provinces) {
            res.json(provinces);
        });
});

module.exports = router;