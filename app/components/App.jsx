var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var ComicList = require('./ComicList.jsx');
var Nav = require('./Nav.jsx');


var App = React.createClass({
    displayName: 'App',
    getInitialState: function() {
    	return {
        	issues: this.extractIssuesFromPublisherData(),
        	filter: null
      	};
    },
    extractIssuesFromPublisherData: function() {
    	return _.flatten(_.pluck(this.props.data.publishers, 'issues'));
    },
    filterByPublisher: function( publisher ) {
        console.log('publisher: ', publisher);
        var allIssues = this.extractIssuesFromPublisherData();

        if (!publisher.length) {
            this.setState({ issues: allIssues });    
        } else {
            var filteredIssues = _.filter( allIssues, { 'publisher': publisher });
            this.setState({ issues: filteredIssues });
        }
    },
    render: function() {
        var publisherNames = _.pluck(this.props.data.publishers, 'name');
        var week = moment(this.props.data.week).format('[Week of] MMMM Do YYYY');

        return (
            <div id="app">
            	<Nav></Nav>
                <h3 className="comics-date">{week}</h3>
            	<ComicList issues={this.state.issues} publishers={publisherNames}
                    filterByPublisher={this.filterByPublisher}></ComicList>
            </div>
        );
    }

});

module.exports = App;