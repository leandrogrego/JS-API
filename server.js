require('dotenv/config');
const app = require('./src/app');
const port = normalizaPort(process.env.HTTP_PORT || '3000');
function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
app.listen(port, function () {
    console.log(`DEVSHOT Server listening on port ${port}`)
})