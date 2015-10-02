var express = require('express');
var perf    = require('../routes/perf');

var app = express();

app.use('/static', express.static('main/static'));
app.use(perf);

module.exports = app;