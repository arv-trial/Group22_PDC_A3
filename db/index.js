const mysql = require('mysql');

function getConnection() {
    return mysql.createConnection({
        // host: 'db4free.net',
        // user: 'mooncactus',
        // database: 'art_trial',
        // password: '555555555',
        host: 'art-trial.c9sjlj4o6qg9.us-east-2.rds.amazonaws.com',
        user: 'admin',
        database: 'arv_trial',
        password: '11111111'
    })
}

module.exports = getConnection