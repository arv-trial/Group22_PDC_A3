const db = require('../utils/db');
module.exports = {
    getAll: () => db.load('SELECT * from drug'),
    add: (drug) => db.add(drug, `drug`)
};
