// react jsx transpiler
require('node-jsx').install();

var app = require('./servers/application');

app.listen(80, function(){
    console.log('NODE_ENV: ' + process.env.NODE_ENV);
    console.log('Application server is running at http://localhost:80');
});