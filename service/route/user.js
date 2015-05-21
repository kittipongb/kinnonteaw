var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
});

router.get("/LoadUsers", function (req, res) {
    console.log('user.js -> /users ');
    var MongoClient = require('mongodb').MongoClient,
        format = require('util').format;

    MongoClient.connect('mongodb://localhost:27017/NodeDB', function (err, db) {
        if (err) throw err;

        var collection = db
            .collection('AppUser')
            .find({})
            .limit(10)
            .toArray(function (err, docs) {
                console.log(docs);
                res.send(docs);
            });
    });
});
module.exports = router;