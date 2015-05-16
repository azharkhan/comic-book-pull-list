var React = require('react');

var Nav = React.createClass({

	render: function() {
		return (
			<div className="nav--container">
				<nav>
					<a href="/">Home</a>
					<a href="/pulls">Pull List</a>
				</nav>
			</div>
		);
	}

});

module.exports = Nav;