/** @jsx React.DOM */
var React = require('react');
var request = require('superagent');

var Test = React.createClass({
    displayName: 'Test',
    getInitialState: function() {
      return {
        code: '<empty></empty>'
      };
    },
    loadExample: function() {
      request.get('./example.json')
        .end(function(res) {
          this.setState({ code: res.body });
        }.bind(this));
    },
    componentWillMount: function() {
      this.loadExample();
    },
    render: function () {
        return (
            <pre>
              <code>{this.state.code}</code>
            </pre>
        );
    }
});

module.exports = Test;