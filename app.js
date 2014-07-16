var restify = require('restify');
var port = process.env.PORT || 1337;

var server = restify.createServer({
  name: 'OKCoders-Dummy-API',
  version: '0.0.1'
});

server.pre(restify.pre.sanitizePath());
// This middleware helps us access form data
server.use(restify.bodyParser());

require('./routes/index')(server);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
