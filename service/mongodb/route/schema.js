var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(config.url.poi.home , function (req, res) {
    res.sendFile(appRoot + '/service/mongodb/view/schema.html');
});
module.exports = router;