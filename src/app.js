var express = require("express");
var app = express();

//Rotas
const index = require('./routes/index');
const userRoute = require('./routes/userRoute');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index);
app.use('/user', userRoute);

module.exports = app