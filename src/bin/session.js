const dbconfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'database'
};
const jsORM = require('js-hibernate');
const session = jsORM.session(dbconfig);

const query = (terms) => session.query(terms);

const tableMap = (table) => {
    
    var t = session.tableMap(table.name);
    // columnMap(object-name-property, table-name-property, optional-property-config)
    table.fields.forEach(async field => {
        t = await t.columnMap(field, field) 
    });
    return t;
}

module.exports = { query, tableMap };