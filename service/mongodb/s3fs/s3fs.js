var express = require('express');
var router = express.Router();
var s3_config = require('./s3fs-config.json');
var fsp = require('fs-promise');
var S3FS = require('s3fs');
var Q = require('q');
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

var s3 = new AWS.S3(); 

AWS.config.region = s3_config.REGION;
AWS.config.accessKeyId = s3_config.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = s3_config.AWS_SECRET_ACCESS_KEY;

var home_bucket = s3_config.HOME_BUCKET;
var user_bucket = s3_config.USER_BUCKET;
var receipt_bucket = s3_config.RECEIPT_BUCKET;

var product_s3fsImpl = new S3FS(home_bucket + product_bucket, {
	accessKeyId: s3_config.AWS_ACCESS_KEY_ID,
 	secretAccessKey: s3_config.AWS_SECRET_ACCESS_KEY
});

var product_category_s3fsImpl = new S3FS(home_bucket + product_category_bucket, {
  accessKeyId: s3_config.AWS_ACCESS_KEY_ID,
  secretAccessKey: s3_config.AWS_SECRET_ACCESS_KEY
});

var user_s3fsImpl = new S3FS(home_bucket + user_bucket, {
  accessKeyId: s3_config.AWS_ACCESS_KEY_ID,
  secretAccessKey: s3_config.AWS_SECRET_ACCESS_KEY
});

var receipt_s3fsImpl = new S3FS(home_bucket + receipt_bucket, {
  accessKeyId: s3_config.AWS_ACCESS_KEY_ID,
  secretAccessKey: s3_config.AWS_SECRET_ACCESS_KEY
});

router.use(multipartyMiddleware);