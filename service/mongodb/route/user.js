var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
});

router.get('/LoadUser', function (req, res, next) {
    db.collection(config.mongodb.user.name)
        .find()
        .toArray(function (err, users) {
            console.log(users);
            res.json(users);
        });
});

router.get('/LoadUserById/:UserId', function (req, res) {
	var UserId = req.params.UserId;

    var o_id = bson.BSONPure.ObjectID(UserId.toString());
	db.collection(config.mongodb.user.name)
		.findOne({
			'_id' : o_id
		}, function (err, user) {
			if (err) {
				console.log(err);
			} else {
                console.log(user);
                res.json(user);
			}
		});
});

router.post('/CreateUser', function (req, res) {
	var User = req.body;
	console.log('create user ' + User);
    db.collection(config.mongodb.user.name)
        .insert(User,
            function (error, NewUser) {
                if (error) throw error
                res.json(NewUser);
            });
});

router.post('/UpdateUser', function(req ,res) {
	var User = req.body;
	var id = User._id;

    var o_id = bson.BSONPure.ObjectID(id.toString());
    db.collection(config.mongodb.user.name)
        .update({
                '_id': o_id
            }, {
                $set: {
                    'DisplayName' : User.DisplayName,
                    'Email' : User.Email,
                    'Password' : User.Password,
                    'RoleId' : User.RoleId,
                    'RefId' : User.RefId,
                    'Via' : User.Via
                }
            },
            function (error, UpdateUser) {
                if (error) throw error
                // console.log(staff);
                res.json(UpdateUser);
            });
});

router.get('/DeleteUser/:UserId', function(req, res) {
	var UserId = req.params.UserId;
    
    var o_id = bson.BSONPure.ObjectID(UserId.toString());
    db.collection(config.mongodb.user.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;