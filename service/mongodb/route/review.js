var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.sendFile(appRoot + '/app/index.html');
});

router.get('/LoadReviewByPoiId/:PoiId', function(req, res) {

});

module.exports = router;