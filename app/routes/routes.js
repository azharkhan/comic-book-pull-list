// get required components
var React = require('react');
var ComicList = React.createFactory(require('../components/ComicList.jsx'));
// get required libraries
var moment = require('moment');
var request = require('request');
// create redis connection
var redis = require('redis');
var client = redis.createClient();

/**
* hashing function source: http://jsperf.com/hashing-strings
*/
function _hashString(string) {
	var result = 0,
		len = string.length;
	for(var i=0; i < len; i++) {
		result = result * 31 + string.charCodeAt(i);
	}
	return result;
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

function _fetchDataForRender(request, response, callback) {
	// find the upcoming wednesday
	var wednesday = moment().day("Wednesday");
	var url = 'http://freshcomics.us/comics/' + wednesday.format('YYYY-MM-DD') + '/json';
	// hash the url to a key for Redis
	var key = _hashString(url).toString();

	// get data from redis

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
		_fetchDataForRender(req, res, function(err, data) {
			if(err) {
				console.log('error! ' + err);
			}
			var props = { data: JSON.parse(data) };
			var comicListHtml = React.renderToString(ComicList(props));
			res.render('home', { comicList: comicListHtml, props: JSON.stringify(props) });
		});
	});

	// app.get('/:date', function(req, res) {

	// });

};