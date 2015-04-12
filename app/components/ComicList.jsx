/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');
var Publisher = require('./Publisher.jsx');

var ComicList = React.createClass({
    displayName: 'ComicList',
    // getInitialState: function() {
    //   console.log('data: ', this.props.data);
    //   return {
    //     data: this.props.data
    //   };
    // },
    render: function () {
      var publishers = _.map(this.props.data.publishers, function(publisher) {
        return (
          <Publisher publisher={publisher}></Publisher>
        );
      });

      var publisherNames = _.pluck(this.props.data.publishers, 'name');

      return (
        <div className="comics-list">
        <div className="publishers-list">{publisherNames}</div>
          {publishers}
        </div>
      );
    }
});

module.exports = ComicList;