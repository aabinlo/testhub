var express = require('express');
var mysql = require('../db/db-device');
var router = express.Router();

var getResponse = function(code){
    var resInfo = {
        'code':0,
        'message':'',
        'request_id':''
    };

    resInfo.code = code;
    var date = new Date();
    resInfo.request_id = (date.getTime()).toString();
    switch(code)
    {
        case 0:
            resInfo.message = 'OK';
            break;
        case -1:
            resInfo.message = 'connect db failed';
            break;
        case -2:
            resInfo.message = 'query db failed';
            break;
        default:
            resInfo.message = 'unknown error';
            break;
    }
    return resInfo;
};

var cb = function(err, results){
    if(!err){
        res.json(getResponse(retCode));
    }else {
        console.log('sql query err : ' + err.message);
    }
};

router.post('/init', function(req, res){
    var deviceInfo = req.body;
    deviceInfo['logo'] = 'test.logo';
    deviceInfo['sockio_port'] = 0;

    mysql.selectDevice(deviceInfo, function(err, retCode, results){
        if(!err){
            if(results == 0){
                console.log('insert new device ' + deviceInfo.brand_name);
                mysql.insertDevice(deviceInfo, function(err, results){
                    if(!err){
                        res.json(getResponse(retCode));
                    }else {
                        console.log('sql query err : ' + err.message);
                    }
                });
            }
            else {
                console.log('update device ' + deviceInfo.brand_name);
                mysql.updateDevice(deviceInfo, function(err, results){
                    res.json(getResponse(retCode));
                });
            }
        }
    });
});

module.exports = router;