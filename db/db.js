/**
 * Created by lqj on 2016/8/15.
 */
var mysql = require('mysql');
var dbCfg = require('./db-cfg');

var pool = mysql.createPool(dbCfg);

function select(sql, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err);
        } else {
            conn.query(sql, function(qerr, results) {
                conn.release();
                callback(qerr, results);
            });
        }
    })
}

var db = {
    select: select
};

module.exports = db;