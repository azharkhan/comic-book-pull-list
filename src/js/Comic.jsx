/** @jsx React.DOM */
var React = require('react');

var Comic = React.createClass({
    displayName: 'Comic',
    render: function () {
        return (
            <div className="comic">
              <h3>{this.props.comic.series} {this.props.comic.issue}</h3>
              <img src={this.props.comic.cover} alt={this.props.comic.series + ' ' + this.props.comic.issue + ' cover'} />
              <div className="info">
                <p className="description">{this.props.comic.description}</p>
              </div>
            </div>
        );
    }
});

module.exports = Comic;