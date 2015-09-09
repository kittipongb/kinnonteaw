var express = require('express');
var router = express.Router();

router.get(config.url.role.home, function(req, res) {
	res.sendFile(appRoot + '/app/index.html');
});

router.get('/LoadRole', function (req, res, next) {
    db.collection(config.mongodb.role.name)
        .find()
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
            //    db.close();
        });
});

router.get('/LoadRoleById/:RoleId', function (req, res) {
	var PoiId = req.params.PoiId;
    var o_id = bson.BSONPure.ObjectID(PoiId.toString());
	db.collection(config.mongodb.role.name)
		.findOne({
			'_id' : o_id
		}, function (err, poi) {
			if (err) {
				console.log(err);
			} else {
				// call your callback with no error and the data
                console.log(poi);
                //     callback(null, doc);
                res.json(poi);
			}
		});
});

router.post('/CreateRole', function(req, res) {
	var Poi = req.body;
	console.log('create poi ' + poi);
    db.collection(config.mongodb.role.name)
        .insert(Poi,
            function (error, NewPoi) {
                if (error) throw error
                res.json(NewPoi);
            });

});

router.post('/UpdateRole', function(req, res){
	var Role = req.body;
	var id = Role._id;
    var o_id = bson.BSONPure.ObjectID(id.toString());
    db.collection(config.mongodb.role.name)
        .update({
                '_id': o_id
            }, {
                $set: {
                    'RoleName' : Role.Name
                }
            },
            function (error, UpdateRole) {
                if (error) throw error
                res.json(UpdateRole);
            });
});

router.get('/DeleteRole/:RoleId', function(req, res) {
	var RoleId = req.params.RoleId;
    console.log('delete role ' + RoleId);

    var o_id = bson.BSONPure.ObjectID(RoleId.toString());
    db.collection(config.mongodb.role.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;