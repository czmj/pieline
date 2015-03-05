/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var date = require('./node_modules/datejs/index.js');
var config = require('config'); //  https://github.com/lorenwest/node-config
 
//load jobboard route
var jobboard = require('./routes/jobboard');

var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
	app.set('port', process.env.PORT || 4200);
	console.log('Development mode');
}
else {
	app.set('port', process.env.PORT || 4300);
	console.log('Live mode');
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/
var dbConfig = config.get('Pieline.dbConfig');

app.use(connection(mysql, dbConfig, 'pool'));


// HTTP routes
app.get('/', jobboard.list);
app.get('/view/:id', jobboard.view);
app.get('/jobs/:location', jobboard.city);
app.get('/jobs/:location/:category', jobboard.citycategory);
app.get('/jobs/:location/:id/:title_:company', jobboard.view);
app.get('/jobs/:location/:id/:title_:company', jobboard.view);
app.get('/speculative', jobboard.speculative);

// private funktions
app.get('/admin/add', jobboard.add);
app.get('/admin/questions', jobboard.questions);
app.get('/admin/upcoming', jobboard.upcoming);
app.post('/admin/add', jobboard.save);
app.post('/contact/:location/:id/:title/:company', jobboard.contact);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
