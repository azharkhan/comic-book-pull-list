/** @jsx React.DOM */

var React = require('react');
var ComicList = require('ComicList.jsx');

var mountNode = document.getElementById('comic-list-mount');
var props = JSON.parse(document.getElementById('props').innerHTML);

React.render(<ComicList data={props.data} />, mountNode);
