var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.route('/login').get(function(req, res) {
    res.render('login');
}).post(function(req, res, next) {
    var user = req.body.email;
    var password = req.body.passwd;
    if (user && password) {
        var sql = 'SELECT password FROM usr where usr=?';
        db.execQuery(sql, user, function(err, results) {
            if (!err) {
                if (results.length > 0 && results[0].password == password) {
                    // cookie expired in 30 mins.
                    res.cookie('user', user, { maxAge: 30 * 60 * 1000, httpOnly: true });
                    res.json({success: true});
                } else {
                    res.json({success: false});
                }
            } else {
                console.error(err.toString());
                var err = new Error(err.toString());
                err.status = 500;
                next(err);
            }
        });
    } else {
        var err = new Error('Login post error');
        err.status = 401;
        next(err);
    }
});

router.route('/register').get(function(req, res) {
    res.render('register');
}).post(function(req, res, next) {

});

module.exports = router;
