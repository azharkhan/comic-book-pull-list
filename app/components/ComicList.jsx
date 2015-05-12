/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');
var Comic = require('./Comic.jsx');
var moment = require('moment');

var ComicList = React.createClass({
    displayName: 'ComicList',
    
    getInitialState: function() {
      return {
        issues: this.extractIssuesFromPublisherData(),
        filter: null
      };
    },

    extractIssuesFromPublisherData: function() {
      return _.flatten(_.pluck(this.props.data.publishers, 'issues'));
    },
    
    handleChange: function(e) {
      var allIssues = this.extractIssuesFromPublisherData();
      var selected = e.target.value;

      if(selected) {
        var filteredIssues = _.filter(allIssues, { 'publisher': selected });
        this.setState({ issues: filteredIssues });
      }
      else {
        this.setState({ issues: allIssues });
      }
    },

    filterList: function(e) {
      var allIssues = this.extractIssuesFromPublisherData();
      var text = e.target.value;

      if(!text || !text.length) {
        // if no text supplied, show full list
        this.setState({ issues: allIssues, filter: null });
      }

      if(text.length >= 3) {
        var matches = _.filter(allIssues, function(issue) {
          return _.contains(issue.series.toLowerCase(), text);
        });
      }

      if(matches && matches.length) {
        this.setState({ issues: matches, filter: text });
      }
    },
    
    render: function () {
      var comics = _.map(this.state.issues, function(issue) {
        return (<Comic comic={issue}></Comic>);
      });

      var publisherNames = _.pluck(this.props.data.publishers, 'name');
      var publisherOptions = _.map(publisherNames, function(name) {
        return (<option value={name}>{name}</option>);
      });

      var week = moment(this.props.data.week).format('[Week of] MMMM Do YYYY');

      return (
        <div className="container--comics">
          <h3 className="comics-date">{week}</h3>
          <form name="publisher-select">
            <label>Select Publisher: </label>
            <div className="styled-select">
              <select defaultValue="" onChange={this.handleChange}>
                <option value="">All</option>
                {publisherOptions}
              </select>
            </div>
            <input type="text" placeholder="Search for Comic... " onChange={this.filterList} />
          </form>
          <div className="comics-list">
            {comics}
          </div>
        </div>
      );
    }
});

module.exports = ComicList;