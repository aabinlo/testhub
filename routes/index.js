var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    //db.queryDeviceList(function(err, results) {
    //    console.log(err, results);
    //});
    res.render('index', { title: 'Express' });
});

module.exports = router;
