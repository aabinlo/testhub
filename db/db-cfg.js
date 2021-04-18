var dbCfg = {
    host: 'th.lo',
    user: 'th',
    password: 'testhub',
    database: 'testhub_dev',
    port: 3306
};

if (process.env.NODE_ENV === 'production') {
    dbCfg.database = 'testhub';
}

module.exports = dbCfg;