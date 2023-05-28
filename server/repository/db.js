const pgp = require('pg-promise')();
const cn = 'postgres://root:root@localhost:5432/programodo';

const db = pgp(cn);

module.exports = db;
