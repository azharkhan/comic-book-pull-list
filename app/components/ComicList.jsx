/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');
var Publisher = require('./Publisher.jsx');

var ComicList = React.createClass({
    displayName: 'ComicList',
    getInitialState: function() {
      console.log('data: ', this.props.data);
      return {
        data: this.props.data
      };
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