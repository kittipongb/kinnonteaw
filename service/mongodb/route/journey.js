var express = require('express');
var router = express.Router();
var Q = require('q');

router.get('/', function(req, res){
    console.log('home journey');
});

router.get('/LoadJourney', function(req, res){
	db.collection('Journey')
        .find({ 
        })
        .sort({
            CreateDate : -1 // Last create date show before if 1 Last createdate go to the bottom
        })
        .toArray(function (err, journeys) {
            if (err) {
            console.log(err);
                
                
            } else {
           //     console.log(journeys);
                res.json(journeys);
            }
        });
});

router.get('/LoadJourneyByPoiId/:PoiId', function(req, res) {
    db.collection('Journey')
        .find({})
        .toArray(function (err, journeys) {
            if (err) {

            } else {
          //      console.log(journeys);
                res.json(journeys);
            }
        });
});

router.get('/LoadJourneyByJourneyId/:JourneyId', function(req, res) {
    var JourneyId = req.params.JourneyId;
    var o_id = bson.BSONPure.ObjectID(JourneyId.toString());
    var LoadJourneyId = function() {
        var defer = Q.defer();
        db.collection('Journey')
        .findOne({
            '_id': o_id
        }, function (err, journey) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(journey);
            }
        });
        return defer.promise;
    }
    var LoadUserById = function(userId) {
        var defer = Q.defer();
        var user_id = bson.BSONPure.ObjectID(userId.toString());
        db.collection('User')
            .findOne({
                $query: { '_id' : user_id} 
            }, function (err, user) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(user);
                }
            });
        return defer.promise;
    };
    var journey = {};
    LoadJourneyId()
    .then(function(data, status) {
        if (!data) {
            console.log('not found journey');
        } else {
            journey = data;
            var userId = journey.UserId;
            return LoadUserById(userId);
        }
    }, function(err, status) {
        console.log('1',err, err.stack.split("\n"));
    })
    .then(function(user, status) {
        if (!user) {
            res.json(journey);
        } else {
            journey.User = user;
            res.json(journey);
        }
    }, function(err, status) {
        console.log('2', err, err.stack.split("\n"));
    });
});

// Create Journey
router.post('/CreateJourney', function (req, res) {
    console.log('roue create journey ');
    var Journey = req.body;
    console.log('create journey ', Journey);
    var createDate = new Date ();
    Journey.UserId = bson.BSONPure.ObjectID(Journey.UserId.toString());
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Journey.CreateDate = createDate;
    Journey.UpdateDate = createDate;
    db.collection('Journey')
        .insert(Journey, function (err, result) {
            if (err) {
                console.log('2', err, err.stack.split("\n"));
            } else {
                console.log(result);
            }
        });
});

// Update Journey
router.get('/UpdateJourney', function (req, res) {
    var Journey = req.body;
 //   console.log('update journey ', Journey);
    var id = Journey._id;
    var o_id = bson.BSONPure.ObjectID(id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    Journey.UpdateDate = updateDate;
    db.collection('Journey')
        .update({
                '_id': o_id
            }, 
            Journey
            , function (error, result) {
                if (error)
                    throw error
                console.log("update journey success ?? " , result);
            });
});

router.get('/DeleteJourney/:JourneyId', function(req, res) {
    var JourneyId = req.params.JourneyId;
    console.log('delete Journey ' + JourneyId);
    var o_id = bson.BSONPure.ObjectID(JourneyId.toString());
    db.collection('Journey')
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});
module.exports = router;