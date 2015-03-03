/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
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


// private funktions
app.get('/admin/add', jobboard.add);
app.post('/admin/add', jobboard.save);
//app.get('/admin/delete/:id', db1.delete_db1);
//app.get('/admin/edit/:id', db1.edit);
//app.post('/admin/edit/:id',db1.save_edit);

//Captcha POST function - see https://jaxbot.me/articles/new-nocaptcha-recaptcha-with-node-js-express-12-9-2014
app.post('/jobs/:location/:id/contact', function(req, res) {
	verifyRecaptcha(req.body["g-recaptcha-response"], function(success) {
		if (success) {
			res.end("Success!");
			// TODO: do registration using params in req.body
		} else {
		res.end("Captcha failed, sorry.");
			// TODO: take them back to the previous page
			// and for the love of everyone, restore their inputs
		}
	});
}); 


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var SECRET="6Ldj0QITAAAAAGAMnsaopoCqQoOFWWXEcvp4nVUg";
var key = "6Ldj0QITAAAAAFHydr_T6uSRvLFr6hVeCzoBMufi";
// Helper function to make API call to recatpcha and check response
function verifyRecaptcha(key, callback) {
	https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
		var data = "";
		res.on('data', function (chunk) {
			data += chunk.toString();
		});
		res.on('end', function() {
			try {
				var parsedData = JSON.parse(data);
				callback(parsedData.success);
			} catch (e) {
				callback(false);
			}
		});
	});
} 
