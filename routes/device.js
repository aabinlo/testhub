var express = require('express');
var mysql = require('../dbo/db_connect')
var router = express.Router();

router.post('/device/init', function(req, res){
    var deviceInfo = req.body;
})

module.exports = router;