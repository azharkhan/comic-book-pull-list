/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');
var Publisher = require('./Publisher.jsx');
var moment = require('moment');

var ComicList = React.createClass({
    displayName: 'ComicList',
    
    getInitialState: function() {
      return {
        data: this.props.data
      };
    },
    
    handleChange: function(e) {
      var selected = e.target.value;
      var selectedPublisher = _.filter(this.props.data.publishers, { 'name': selected });

      if (!selected) {
        this.setState({ data: this.props.data });
      }
      else {
        this.setState({ data: { publishers: selectedPublisher } });
      }
    },
    
    render: function () {
      var publishers = _.map(this.state.data.publishers, function(publisher) {
        return (
          <Publisher publisher={publisher}></Publisher>
        );
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
          </form>
          <div className="comics-list">
            {publishers}
          </div>
        </div>
      );
    }
});

module.exports = ComicList;