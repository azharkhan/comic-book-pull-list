/** @jsx React.DOM */
var React = require('react');
var request = require('superagent');
var _ = require('lodash');
var Publisher = require('./Publisher.jsx');

var ComicList = React.createClass({
    displayName: 'ComicList',
    getInitialState: function() {
      return {
        data: {}
      };
    },
    loadDataFromServer: function() {
      request.get('./example.json')
        .end(function(res) {
          this.setState({ data: res.body });
        }.bind(this));
    },
    componentWillMount: function() {
      this.loadDataFromServer();
    },
    render: function () {
      var publishers = _.map(this.state.data.publishers, function(publisher) {
        return (
          <Publisher publisher={publisher}></Publisher>
        );
      });

      return (
        <div className="comics-list">
          {publishers}
        </div>
      );
    }
});

module.exports = ComicList;