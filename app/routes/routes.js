var React = require('react');
var ComicList = React.createFactory(require('../components/ComicList.jsx'));
var sampleData = require('../data/sampleData.js');

module.exports = function(app) {

	app.get('/', function(req, res){
		var props = { data: sampleData };
		var comicListHtml = React.renderToString(ComicList(props));
		res.render('home', { comicList: comicListHtml, props: JSON.stringify(props) });
	});

};