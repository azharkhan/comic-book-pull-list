/** @jsx React.DOM */
var React = require('react');
var Comic = require('./Comic.jsx');
var _ = require('lodash');

var Publisher = React.createClass({
    displayName: 'Publisher',
    render: function () {
      var issues = _.map(this.props.publisher.issues, function(issue) {
        return (
          <Comic comic={issue}></Comic>
        );
      });
        return (
            <div className="publisher">
              <h1 className="publisher-name">{this.props.publisher.name}</h1>
              <img src={this.props.publisher.logo} />
              <div className="publisher-issues">
                {issues}
              </div>
            </div>
        );
    }
});

module.exports = Publisher;