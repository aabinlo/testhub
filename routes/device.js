var express = require('express');
var mysql = require('../db/db-device');
var db = require('../db/db');
var router = express.Router();

var getResponse = function (code) {
    var resInfo = {
        'code': 0,
        'message': '',
        'request_id': ''
    };

    resInfo.code = code;
    var date = new Date();
    resInfo.request_id = (date.getTime()).toString();
    switch (code) {
        case 0:
            resInfo.message = 'OK';
            break;
        case -1:
            resInfo.message = 'query db failed';
            break;
        case -2:
            resInfo.message = 'unexpect error';
            break;
        default:
            resInfo.message = 'unknown error';
            break;
    }
    return resInfo;
};

router.post('/init', function (req, res) {
    try {
        var deviceInfo = req.body;
        deviceInfo['logo'] = 'test.logo';
        deviceInfo['sockio_port'] = 0;

        mysql.selectDevice(deviceInfo, function (err, results) {
            if (err) {
                res.json(getResponse(-1));
            } else {
                if (typeof results != 'undefined' && results.length > 0) {
                    console.log('update device ' + deviceInfo.brand_name);
                    mysql.updateDevice(deviceInfo, function (err, results) {
                        var code = err ? -1 : 0;
                        res.json(getResponse(code));
                    });
                } else {
                    console.log('insert new device ' + deviceInfo.brand_name);
                    mysql.insertDevice(deviceInfo, function (err, results) {
                        var code = err ? -1 : 0;
                        res.json(getResponse(code));
                    });
                }
            }
        });
    } catch (err) {
        res.json(getResponse(-2));
    }
});

router.get('/list', function(req, res) {
    console.log('list');
    var sql = 'SELECT device_id, resolution, device_status FROM device_info';
    db.execQuery(sql, null, function(err, results) {
        console.log(err, results);
        res.json(results);
    });
});

router.get('/screen_port', function(req, res, next) {
    var deviceId = req.query.device_id;
    if (!deviceId) {
        var err = new Error('NO ID');
        err.status = 400;
        next(err);
    }
    var sql = 'SELECT ctrl_port, data_port FROM device_info where device_id=?';
    db.execQuery(sql, deviceId, function(err, results) {
        if (!err) {
            if (results.length > 0) {
                res.json(results);
            } else {
                var err = new Error('ID NOT FOUND');
                err.status = 404;
                next(err);
            }
        } else {
            var err = new Error('Query screen_port failed' + err.toString());
            err.status = 500;
            next(err);
        }
    });
});

router.get('conn_port', function(req, res, next) {
    var deviceId = req.query.device_id;
    if (!deviceId) {
        var err = new Error('NO ID');
        err.status = 400;
        next(err);
    }
    var sql = 'SELECT conn_port FROM device_info where device_id=?';
    db.execQuery(sql, deviceId, function(err, results) {
        if (!err) {
            if (results.length > 0) {
                res.json(results);
            } else {
                var err = new Error('ID NOT FOUND');
                err.status = 404;
                next(err);
            }
        } else {
            var err = new Error('Query conn_port failed' + err.toString());
            err.status = 500;
            next(err);
        }
    });
});

router.get('/debug/:id', function(req, res, next) {
    res.render('debug-device', {deviceId: req.params.id});
});

module.exports = router;