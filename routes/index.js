var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Express' });
});

router.get('/device/list', function(req, res, next) {
    var sql = 'SELECT device_id, resolution, device_status FROM device_info';
    db.select(sql, function(err, results) {
        console.log(err, results);
        res.json(results);
    });
});

module.exports = router;
