
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , user = require('./routes/user')
  , render = require('./routes/render')
  , ejs = require('ejs')
  , mongoose = require( 'mongoose' )  ;

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


app.get('/', routes.index);
app.post('/render', render.list);
app.get('/users', user.list);



app.listen(3000);
console.log('Listening on port 3000');