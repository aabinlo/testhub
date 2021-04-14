/**
 * Created by lqj on 2016/8/15.
 */
var mysql = require('mysql');
var dbCfg = require('./db-cfg');

var pool = mysql.createPool(dbCfg);

function sqlQuery(sql, args, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('connect sql server failed ' + err.message);
            callback(err);
        } else {
            if (args) {
                var query = conn.query(sql, args, function (qerr, results, fields) {
                    if (qerr) {
                        console.log('query sql error ' + sql.toString() + ' ' + qerr.message);
                        callback(qerr);
                    }else {
                        callback(null, results, fields);
                    }
                });
            } else {
                var query = conn.query(sql, function (qerr, results, fields) {
                    if (qerr) {
                        console.log('query sql error ' + sql.toString() + ' ' + qerr.message);
                        callback(qerr);
                    }else {
                        callback(null, results, fields);
                    }
                });
            }
            conn.release();
        }
    });
};

module.exports.execQuery = sqlQuery;