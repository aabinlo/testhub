var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.cookies.user) {
        res.redirect('/users/login');
    } else {
        res.render('index', {user: req.cookies.user});
    }
});

module.exports = router;
