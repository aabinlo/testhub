var mysql = require('mysql');
var sqlCfg = require('./config');

var sqlConnection;
//connect db
function connectDB(){
    sqlConnection = mysql.createConnection(sqlCfg.mysql_cfg);
    sqlConnection.connect(function(err){
        if(err){
            console.error('sql connect error :' + err.message + '\n');
            return false;
        }
    });

    return true;
}

//close db
function closeDB(){
    sqlConnection.end();
}

//insert device info
function insertDeviceInfo(deviceInfo){
    var insertSql = 'insert into device_info value(?, ?, ?, ?, ?, ?, ?, ?, ?, \
    ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var valueArray = new Array();
    var i = 0;
    for(x in deviceInfo){
        valueArray[i++] = (deviceInfo[x]).toString();
    }

    sqlConnection.query(insertSql, valueArray, function(err, result){
        if(err){
            console.error('insert error :' + err.message);
            return false;
        }
    });

    return true;
}

module.exports.connect = connectDB;
module.exports.disconnect = closeDB;
module.exports.insertDevice = insertDeviceInfo;