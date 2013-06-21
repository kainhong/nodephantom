
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , user = require('./routes/user')
  , render = require('./routes/render')
  , ejs = require('ejs')
  , mongoose = require( 'mongoose' )  ;
var childProcess = require('child_process');
var path = require('path');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var app = module.exports = express();
mongoose.connect('mongodb://localhost/touzi101');
var listenport = '3001';
// all environments

app.engine('.html', ejs.__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));      // log requests
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/render', render.list);
app.post('/cleardatabase', render.cleandatas);
app.get('/users', user.list);
app.get('/screenshot', function(req, res) {
    var imagepath = path.join('./touzi101','godddggle.png');
    res.send('<img src="' + imagepath + '"/>');
});
app.get('/fetchdata',render.fetchdata);
app.get('/node-phantom', function(request, response){
	var script = path.join(__dirname, '/open-url.js');
	var childArgs = [
		script, 'http://www.google.com'
	];
	childProcess.execFile(binPath, childArgs, function(err, stdout, stderr){
		response.writeHead( 200, {
            "Content-Type": "text/html; charset=UTF-8"
        } );

        response.end( "<!doctype html><html>" + stdout + "</html>" );
	});
});

app.listen(listenport);
console.log('Listening on port ' + listenport);