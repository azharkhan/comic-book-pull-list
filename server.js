// define an express app

var express = require('express');
var app = express();

// include the JSX transpiler
require('node-jsx').install({extension: '.jsx'});

var path = require('path');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

// used to get information from HTML forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var port = Number(process.env.PORT || 5000);

// set up middleware for public files
app.use(express.static(path.join(__dirname, 'public')));

// set handlebars as the template language
app.engine('handlebars', handlebars({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// set routes

require('./app/routes/routes.js')(app);

app.listen(port);

console.log('App running on port ' + port + ' ... ');


