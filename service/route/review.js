var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.send("You Get poi_subtype");
});

module.exports = router;