var db = require('./db');


function deviceToArray(info){
    var strArray = new Array();
    strArray.push(info['device_id']);
    strArray.push(info['conn_ip']);
    strArray.push(info['ctrl_port']);
    strArray.push(info['data_port']);
    strArray.push(info['conn_port']);
    strArray.push(info['ths_port']);
    strArray.push(info['sockio_port']);
    strArray.push(info['screen_size']);
    strArray.push(info['resolution']);
    strArray.push(info['device_status']);
    strArray.push(info['ram']);
    strArray.push(info['rom']);
    strArray.push(info['temperature']);
    strArray.push(info['brand_name']);
    strArray.push(info['model_name']);
    strArray.push(info['os']);
    strArray.push(info['cpu']);
    strArray.push(info['logo']);
    return strArray;
}

function insertDeviceInfo(deviceInfo, callback){
    var insertSql = 'insert into device_info value(?, ?, ?, ?, ?, ?, ?, ?, ?, \
    ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var valueArray = deviceToArray(deviceInfo);
    db.execQuery(insertSql, valueArray, callback);
}

function updateDeviceInfo(deviceInfo, callback){
    var updateSql = 'update device_info set conn_ip = ?, ctrl_port = ?,' +
        'data_port = ?, conn_port = ?, ths_port = ?, sockio_port = ?, device_status = ?' +
        'where device_id = ?';
    var valueArray = new Array();
    valueArray.push(deviceInfo['conn_ip']);
    valueArray.push(deviceInfo['ctrl_port']);
    valueArray.push(deviceInfo['data_port']);
    valueArray.push(deviceInfo['conn_port']);
    valueArray.push(deviceInfo['ths_port']);
    valueArray.push(deviceInfo['sockio_port']);
    valueArray.push(deviceInfo['device_status']);
    valueArray.push(deviceInfo['device_id']);
    db.execQuery(updateSql, valueArray, callback);
}

function selectDeviceInfo(deviceInfo, callback) {
    var selectSql = 'select * from device_info where device_id = ?';
    var valueArray = new Array();
    valueArray.push(deviceInfo['device_id']);
    db.execQuery(selectSql, valueArray, callback);
}

function getAllDevice(callback){
    var sql = 'select * from device_info';
    db.execQuery(sql, null, callback);
}

module.exports.insertDevice = insertDeviceInfo;
module.exports.updateDevice = updateDeviceInfo;
module.exports.selectDevice = selectDeviceInfo;
module.exports.getAllDevice = getAllDevice;