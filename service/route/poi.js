var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send("You come in poi");
});

router.get('/LoadPoi', function (req, res, next) {
    collection = db
        .collection(DB.COLLECTION_POI)
        .find()
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
            //    db.close();
        });
});

module.exports = router;