var express = require('express');
var router = express.Router();
var Q = require('q');

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
    db.collection('User')
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

router.post('/CreateAndUpdateWithSocial', function (req, res) {
    var Social = req.body;
    var checkIsExistSocialAccount = function() {
        var defer = Q.defer();
        db.collection('User')
            .findOne(
                {
                    'SocialId' : Social.id,
                    'Terminal' : Social.provider
                }
                , function (err, isexist) {
                    if (err) {
                        console.log('err ', err);
                        defer.reject(err);
                    } else {
                        defer.resolve(isexist);
                    }
                });
        return defer.promise;
    }
    var createSocialAccount = function() {
        delete Social.Signin_Username;
        delete Social.Signin_Password;
        delete Social.Signup_Email;
        delete Social.Signup_Username;
        delete Social.Signup_Password;
        
        var defer = Q.defer();
        var appuser = {
                'Username' : '',
                'Password' : '',
                'Email' : Social.email,
                'Firstname' : Social.firstname,
                'Lastname' : Social.lastname,
                'Name' : Social.name,
                'IsActivate': true,
                'UserType' : 'user',
                'Terminal' : Social.provider,
                'SocialId' : Social.id
            };
            db.collection('User')
                .insert(appuser, function (err, result) {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(result);
                    }
            });
        return defer.promise;
    }

    checkIsExistSocialAccount()
    .then(function(data, status) {
        if (data) {
            res.json(data);
        } else if (!data) {
            return createSocialAccount();
        }
    },function (err, status) {
        console.log(err, err.stack.split("\n"));
        res.json(500, err);
        return;
    })
    .then(function(data, status) {
        res.json(data);
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.json(500, err);
        return;
    });
});

router.get('/FindByUsernameAndPassword/:Username/:Password', function (req, res) {
    console.log('user.js -> /users ');
    var findOneAppUserPromise = function (query) {
        var defer = Q.defer();
        db.collection('User')
            .findOne(query, function (err, doc) {
            if (err) {
            //    console.log(err);
                defer.reject(err);
            } else {
                console.log('oneuser ', doc);
                defer.resolve(doc);
            }
        });
        return defer.promise;
    }
    var findOneRolePromise = function (queryRole) {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.role.name)
            .findOne(queryRole, function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(doc);
            }
        });
        return defer.promise;
    }
    var findOneStaffPromise = function (queryStaff) {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.staff.name)
            .findOne(queryStaff, function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(doc);
            }
        });
        return defer.promise;
    }
    var findFirstAppUserFromUI = function (queryFindUserFirst) {
        var defer = Q.defer();
        db.collection('User')
            .findOne(queryFindUserFirst , function (err, doc) {
            if( err ) {
                defer.reject(err);
            } else {
                defer.resolve(doc);
            }
        });
        return defer.promise;
    }

    var Username = req.params.Username;
    var Password = req.params.Password;
    var queryFindUserFirst = {$or: [ { Username: Username }, { Email : Username } ]};
    var AppUser = {};
    // First Call , check is exist Username/Email and Password exist ?
    findFirstAppUserFromUI(queryFindUserFirst)
    .then(function(data, status) {
        if(!data) {
            res.sendStatus(404);
            return;
        } else {
            console.log('1',data);
            var queryOneAppUser = {
               $or: [ { Username: Username }, { Email : Username } ],
               Terminal : 'web'
            };
            return findOneAppUserPromise(queryOneAppUser);
        }
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    })
    .then(function(data, status) {
        console.log('2',data);
        res.json(data);
    });
    var findOneAppUser = function (query, callback) {
        db.collection('User').findOne(query, function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                callback(null, doc);
            }
        });
    }

    
}); // End Find by Username and Password
module.exports = router;