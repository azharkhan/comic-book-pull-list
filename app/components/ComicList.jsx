/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');
var Comic = require('./Comic.jsx');
var moment = require('moment');

var ComicList = React.createClass({
    displayName: 'ComicList',
    
    handleChange: function(e) {
        var selected = e.target.value;
        this.props.filterByPublisher( selected );
    },

    // filterList: function(e) {
    //   var allIssues = this.extractIssuesFromPublisherData();
    //   var text = e.target.value;

    //   if(!text || !text.length) {
    //     // if no text supplied, show full list
    //     this.setState({ issues: allIssues, filter: null });
    //   }

    //   if(text.length >= 3) {
    //     var matches = _.filter(allIssues, function(issue) {
    //       return _.contains(issue.series.toLowerCase(), text);
    //     });
    //   }

    //   if(matches && matches.length) {
    //     this.setState({ issues: matches, filter: text });
    //   }
    // },
    
    render: function () {
      var comics = _.map(this.props.issues, function(issue) {
        return (<Comic comic={issue}></Comic>);
      });

      var publisherOptions = _.map(this.props.publishers, function(name) {
        return (<option value={name}>{name}</option>);
      });

      return (
        <div className="container--comics">
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