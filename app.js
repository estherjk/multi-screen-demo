// module dependencies
var express = require('express')
  , http = require('http')
  , path = require('path')
  , socketio = require('socket.io')

  , routes = require('./routes')
  , api = require('./routes/api');

// app variables
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:view', routes.partials);

// REST API
app.get('/api/user', api.getUser);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Socket.io communication
io.sockets.on('connection', require('./routes/socket'));

// HTTP server
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
