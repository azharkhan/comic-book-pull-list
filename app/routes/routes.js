var React = require('react');
var ComicList = React.createFactory(require('../components/ComicList.jsx'));
var sampleData = require('../data/sampleData.js');
var moment = require('moment');
var request = require('request');

module.exports = function(app) {

	app.get('/', function(req, res){
		// find the upcoming wednesday
		var wednesday = moment().day("Wednesday");
		var url = 'http://freshcomics.us/comics/' + wednesday.format('YYYY-MM-DD') + '/json';
		
		request(url, function(error, response, body) {
			if(!error && response.statusCode == 200) {
				var props = { data: JSON.parse(body) };
				var comicListHtml = React.renderToString(ComicList(props));
				res.render('home', { comicList: comicListHtml, props: JSON.stringify(props) });
			}
		});
	});

};