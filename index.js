var http = require('http');
var app = require('./config/express.js')();
require('./config/passport')();
require('./config/database')('mongodb://localhost/crud-pessoas');

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Server escutando na porta ' + app.get('port'));
});
