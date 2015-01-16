/** @jsx React.DOM */
var React = require('react');

var Greeting = React.createClass({
    displayName: 'Greeting',
    render: function () {
        return (
            <h1>Hello, this is a React module!</h1>
        );
    }
});

module.exports = Greeting;