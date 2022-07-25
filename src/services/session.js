const dbconfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'database'
};
const jsORM = require('js-hibernate');
const session = jsORM.session(dbconfig)

const tableChecking = async (table) => {
    var fields = `id INT NOT NULL AUTO_INCREMENT `
    table.fields.forEach(field => {
        field === (`id`) ? {} : 
        fields += `, ${field} VARCHAR(255) `
    })
    fields += ` , PRIMARY KEY (id)`
    console.log(`\nChecking Table ${table.name} ...   `)
    var sql = `CREATE TABLE \`${table.name}\` (${fields}) ENGINE = InnoDB`
    await session.executeSql( sql )
    .then(async function(result) {
        result.length > 0 
        ? 
        console.log(`TABLE ${table.name} exists.`)
        : 
        await session.executeSql( `CREATE TABLE '${table.name}'`)
        .then(console.log(`TABLE ${table.name} created.`))
        .catch(function(error) {
            console.log(error.sqlMessage);
        });
    }).catch(function(error) {
        console.log(error.sqlMessage);
    })
}

const query = async (terms) => await session.query(terms);

const tableMap = async (table) => {
    await tableChecking(table)
    var t = session.tableMap(table.name);
    // columnMap(object-name-property, table-name-property, optional-property-config)
    table.fields.forEach(async field => {
        t = await t.columnMap(field, field) 
    });
    return t;
}

module.exports = { query, tableMap };