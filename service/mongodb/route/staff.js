var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.send("You Get staff");
});

router.get('/LoadStaff', function (req, res, next) {
    collection = db
        .collection(DB.COLLECTION_STAFF)
        .find()
        .toArray(function (err, staffs) {
            console.log(staffs);
            res.json(staffs);
            //    db.close();
        });
});

router.get('/LoadStaffById/:StaffId', function (req, res) {
	var StaffId = req.params.StaffId;
	var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(StaffId.toString());
	db.collection(DB.COLLECTION_STAFF)
		.findOne({
			'_id' : o_id
		}, function (err, staff) {
			if (err) {
				console.log(err);
			} else {
				// call your callback with no error and the data
                console.log(staff);
                //     callback(null, doc);
                res.json(staff);
			}
		});
});

router.post('/CreateStaff', function (req, res) {
	var Staff = req.body;
	console.log('create staff ' + Staff);
    db.collection(DB.COLLECTION_STAFF)
        .insert(Staff,
            function (error, NewStaff) {
                if (error) throw error
                res.json(NewStaff);
            });
});

router.post('/UpdateStaff', function(req ,res) {
	var Staff = req.body;
	var id = Staff._id;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(id.toString());
    console.log('type 1 ' + id);
    db.collection(DB.COLLECTION_STAFF)
        .update({
                '_id': o_id
            }, {
                $set: {
                //    'ProductTypeNameTh': ProductType.ProductTypeNameTh,
                //    'ProductTypeNameEn': ProductType.ProductTypeNameEn,
                //    'ProductTypeNameCn': ProductType.ProductTypeNameCn
                }
            },
            function (error, UpdateStaff) {
                if (error) throw error
                // console.log(staff);
                res.json(UpdateStaff);
            });
});

router.get('/DeleteStaff/:StaffId', function(req, res) {
	var StaffId = req.params.StaffId;
    console.log('create staff ' + StaffId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(StaffId);
    db.collection(DB.COLLECTION_STAFF)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;