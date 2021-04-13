var express = require('express');
var mysql = require('../db/db-device');
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

module.exports = router;