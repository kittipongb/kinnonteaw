var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.send("You Get staff");
});

router.get('/LoadStaff', function (req, res, next) {
    collection = db
        .collection(config.mongodb.staff.name)
        .find()
        .toArray(function (err, staffs) {
            console.log(staffs);
            res.json(staffs);
        });
});

router.get('/LoadStaffById/:StaffId', function (req, res) {
	var StaffId = req.params.StaffId;

    var o_id = bson.BSONPure.ObjectID(StaffId.toString());
	db.collection(config.mongodb.staff.name)
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
    db.collection(config.mongodb.staff.name)
        .insert(Staff,
            function (error, NewStaff) {
                if (error) throw error
                res.json(NewStaff);
            });
});

router.post('/UpdateStaff', function(req ,res) {
	var Staff = req.body;
	var id = Staff._id;

    var o_id = bson.BSONPure.ObjectID(id.toString());
    db.collection(config.mongodb.staff.name)
        .update({
                '_id': o_id
            }, {
                $set: {
                    'Firstname' : Staff.Firstname,
                    'Lastname' : Staff.Firstname,
                    'Gender' : Staff.Firstname,
                    'Age' : Staff.Firstname,
                    'Address' : Staff.Firstname,
                    'Status' : Staff.Firstname,
                    'BirthDate' : Staff.Firstname,
                    'Title' : Staff.Title
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

    var o_id = bson.BSONPure.ObjectID(StaffId.toString());
    db.collection(config.mongodb.staff.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;