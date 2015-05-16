// get required components
var React = require('react');
var App = React.createFactory(require('../components/App.jsx'));
// get required libraries
var moment = require('moment');
var request = require('request');
var crypto = require('crypto');
// create redis connection
var redis = require('redis');
var client = redis.createClient();

var SOURCE_URL = 'http://freshcomics.us/comics/';

/**
* hashing function source: http://jsperf.com/hashing-strings
*/
function _hashString(string) {
	return crypto.createHash('md5').update(string).digest('hex');
}

// fetch data from FreshComics if not in redis
function _getDataFromSource(url, key, callback) {
	request(url, function(error, resp, body) {
		if(!error && resp.statusCode == 200) {
			// save data to redis, and return
			client.set(key, body, function(err, result) {
				if(err) { return callback(err); }
				else { return callback(null, body); }
			});
			// set key to expire in 1 day
			client.expire(key, 86400);
		}
	});
}

function _checkRedisForData(key, url, callback) {
	// check if data exists for key in redis
	client.get(key, function(err, reply) {
		if(err) {
			return callback(err);
		}
		if (reply) {
			console.log('redis has info!');
			return callback(null, reply);
		}

		// no data in redis, get from url
		console.log('no data in redis, get from url');
		_getDataFromSource(url, key, callback);
	});

}

function _fetchDataForRender(request, response, url, key, callback) {

	// check if data in Redis, if not, get from URL
	console.log('fetching data for render');
	_checkRedisForData(key, url, callback);
}

// define routes for the app

module.exports = function(app) {

	// setup redis listeners

	client.on('connect', function() {
		console.log('connected to redis...');
	});

	client.on('error', function(err) {
		console.log('error! ' + err);
	});

	app.get('/', function(req, res) {
		// find the upcoming wednesday
		var wednesday = moment().day("Wednesday");
		var url = SOURCE_URL + wednesday.format('YYYY-MM-DD') + '/json';
		// hash the url to a key for Redis
		var key = _hashString(url).toString();

		_fetchDataForRender(req, res, url, key, function(err, data) {
			if(err) {
				console.log('error! ' + err);
			}
			var props = { data: JSON.parse(data) };
			var appMarkup = React.renderToString(App(props));
			res.render('home', { app: appMarkup, props: JSON.stringify(props) });
		});
	});

	app.get('date/:date', function(req, res) {
		var date = moment(req.params.date);
		var url = SOURCE_URL + date.format('YYYY-MM-DD') + '/json';
		var key = _hashString(url).toString();

		_fetchDataForRender(req, res, url, key, function(err, data) {
			if(err) {
				console.log('error! ' + err);
			}
			var props = { data: JSON.parse(data) };
			var appMarkup = React.renderToString(App(props));
			res.render('home', { app: appMarkup, props: JSON.stringify(props) });
		});
	});

};