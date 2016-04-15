var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.sendFile(appRoot + '/app/index.html');
});

router.get('/LoadReviewByPoiId/:PoiId', function(req, res) {

});

// Create Review
router.get('/CreateReview', function (req, res, next) {
    var Review = req.body;
    console.log('create review ', Review);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Review.CreateDate = createDate;
    Review.UpdateDate = createDate;
    db.collection(config.mongodb.poi_subtype.name)
        .insert(poisubtype, function (error, result) {
            if (error) throw error

            console.log("Insert poi sub type success ?? " + result[0]._id);
        });
});


// Update Review
router.get('/UpdateReview', function (req, res, next) {
    var Review = req.body;
    console.log('update review ', Review);
    var id = Review._id;
    var o_id = bson.BSONPure.ObjectID(id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    Review.UpdateDate = updateDate;
    db.collection(config.mongodb.poi_subtype.name)
        .update({
                '_id': o_id
            }, 
            Review
            , function (error, result) {
                if (error)
                    throw error
                console.log("update review success ?? " , result);
            });
});

router.get('/DeleteReview/:ReviewId', function(req, res) {
    var ReviewId = req.params.ReviewId;
    console.log('delete Review ' + ReviewId);
    var o_id = bson.BSONPure.ObjectID(ReviewId.toString());
    db.collection(config.mongodb.review.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});
module.exports = router;