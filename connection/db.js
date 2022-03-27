const { Pool } = require('pg');
// const { port } = require('pg/lib/defaults');

const dbPool = new Pool({
    database: 'postgres',
    port: '5432',
    user: 'postgres',
    password: '212121',
})

module.exports = dbPool;