/** @jsx React.DOM */

var React = require('react');
var App = require('App.jsx');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var mountNode = document.getElementById('app-mount');
var props = JSON.parse(document.getElementById('props').innerHTML);

// initialize Parse
Parse.initialize("pXvDRqKEb4VDzfgMb32EIG8bRHpmUEibRuCa8tw1", "xdzkBYSGeQlglf3PUN4Us8DFdyPtwJwfwL9UfuYN");

React.render(<App data={props.data} />, mountNode);
