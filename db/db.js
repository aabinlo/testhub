/**
 * Created by lqj on 2016/8/15.
 */
var mysql = require('mysql');
var dbCfg = require('./db-cfg');

var pool = mysql.createPool(dbCfg);

function sqlQuery(sql, args, handler){
    pool.getConnection(function(err, conn){
        if(err){
            console.log('connect sql server failed ' + err.message);
            handler(err);
        }else{
            if(args){
                var query = conn.query(sql, args, function(qerr, results){
                    if(qerr){
                        console.log('query sql error ' + sql.toString() + ' ' + qerr.message);
                        handler(qerr);
                    }

                    handler(null, results);
                });
            }
            else {
                var query = conn.query(sql, function(qerr, results){
                    if(qerr){
                        console.log('query sql error ' + sql.toString() + ' ' + qerr.message);
                        handler(qerr);
                    }

                    handler(null, results);
                });
            }
            conn.release();
        }
    });
};

module.exports.execQuery = sqlQuery;