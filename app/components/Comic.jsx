/** @jsx React.DOM */
var React = require('react');

var Comic = React.createClass({
    displayName: 'Comic',
    render: function () {
        return (
            <div className="comic">
              <div className="preview">
                <h3>{this.props.comic.series} {this.props.comic.issue}</h3>
                <div className="comic-cover">
                    <img src={this.props.comic.cover} alt={this.props.comic.series + ' ' + this.props.comic.issue + ' cover'} />
                </div>
                <p className="description">{this.props.comic.description}</p>
              </div>
            </div>
        );
    }
});

module.exports = Comic;
