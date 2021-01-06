const mysql = require('mysql');

function getConnection() {
    return mysql.createConnection({
        host: 'db4free.net',
        user: 'mooncactus',
        database: 'art_trial',
        password: '555555555',
    })
}

module.exports = getConnection
