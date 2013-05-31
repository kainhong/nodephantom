
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


mongoose.connect('mongodb://localhost/touzi101');



var app = module.exports = express();

// all environments

app.engine('.html', ejs.__express);
app.set('views', __dirname + '/views');
//app.set('view engine', 'html');
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

console.log('dirname :'+__dirname);
app.get('/', routes.index);
app.post('/render', render.list);
app.get('/users', user.list);
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


app.listen(3000);
console.log('Listening on port 3000');