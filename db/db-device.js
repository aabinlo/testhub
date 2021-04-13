var db = require('./db');


function deviceToArray(info){
    var strArray = new Array();
    var i = 0;
    strArray[i++] = info['device_id'];
    strArray[i++] = info['conn_ip'];
    strArray[i++] = info['ctrl_port'];
    strArray[i++] = info['data_port'];
    strArray[i++] = info['conn_port'];
    strArray[i++] = info['ths_port'];
    strArray[i++] = info['sockio_port'];
    strArray[i++] = info['screen_size'];
    strArray[i++] = info['resolution'];
    strArray[i++] = info['device_status'];
    strArray[i++] = info['ram'];
    strArray[i++] = info['rom'];
    strArray[i++] = info['temperature'];
    strArray[i++] = info['brand_name'];
    strArray[i++] = info['model_name'];
    strArray[i++] = info['os'];
    strArray[i++] = info['cpu'];
    strArray[i++] = info['logo'];
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
    var i = 0;
    valueArray[i++] = deviceInfo['conn_ip'];
    valueArray[i++] = deviceInfo['ctrl_port'];
    valueArray[i++] = deviceInfo['data_port'];
    valueArray[i++] = deviceInfo['conn_port'];
    valueArray[i++] = deviceInfo['ths_port'];
    valueArray[i++] = deviceInfo['sockio_port'];
    valueArray[i++] = deviceInfo['device_status'];
    valueArray[i++] = deviceInfo['device_id'];
    db.execQuery(updateSql, valueArray, callback);
}

function selectDeviceInfo(deviceInfo, callback) {
    var selectSql = 'select * from device_info where device_id = ?';
    var valueArray = new Array();
    valueArray[0] = deviceInfo['device_id'];
    db.execQuery(selectSql, valueArray, callback);
}

module.exports.insertDevice = insertDeviceInfo;
module.exports.updateDevice = updateDeviceInfo;
module.exports.selectDevice = selectDeviceInfo;