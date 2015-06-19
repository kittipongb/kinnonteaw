var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
});

router.get('/LoadUser', function (req, res, next) {
    db.collection(DB.COLLECTION_USER)
        .find()
        .toArray(function (err, users) {
            console.log(users);
            res.json(users);
        });
});

router.get('/LoadUserById/:UserId', function (req, res) {
	var UserId = req.params.UserId;
	var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(UserId.toString());
	db.collection(DB.COLLECTION_USER)
		.findOne({
			'_id' : o_id
		}, function (err, user) {
			if (err) {
				console.log(err);
			} else {
				// call your callback with no error and the data
                console.log(user);
                //     callback(null, doc);
                res.json(user);
			}
		});
});

router.post('/CreateUser', function (req, res) {
	var User = req.body;
	console.log('create user ' + User);
    db.collection(DB.COLLECTION_USER)
        .insert(User,
            function (error, NewUser) {
                if (error) throw error
                res.json(NewUser);
            });
});

router.post('/UpdateUser', function(req ,res) {
	var User = req.body;
	var id = User._id;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(id.toString());
    console.log('type 1 ' + id);
    db.collection(DB.COLLECTION_USER)
        .update({
                '_id': o_id
            }, {
                $set: {
                //    'ProductTypeNameTh': ProductType.ProductTypeNameTh,
                //    'ProductTypeNameEn': ProductType.ProductTypeNameEn,
                //    'ProductTypeNameCn': ProductType.ProductTypeNameCn
                }
            },
            function (error, UpdateUser) {
                if (error) throw error
                // console.log(staff);
                res.json(UpdateUser);
            });
});

router.get('/DeleteStaff/:StaffId', function(req, res) {
	var UserId = req.params.UserId;
    console.log('create staff ' + UserId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(UserId);
    db.collection(DB.COLLECTION_USER)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;