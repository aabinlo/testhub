/**
 * Created by lqj on 2016/8/15.
 */
var mysql = require('mysql');
var dbCfg = require('./db-cfg');
var sql = require('./sql');

var pool = mysql.createPool(dbCfg);

function queryDeviceList(callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err);
        } else {
            conn.query(sql.queryDevceList, function (qerr, results) {
                conn.release();
                callback(qerr, results);
            })
        }
    });
}

var db = {
    queryDeviceList: queryDeviceList
};

module.exports = db;