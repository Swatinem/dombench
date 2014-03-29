/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

module.exports = ReactKeyed;

function ReactKeyed(data) {
	this.data = data;
	this.el = document.createElement('div');
	this.el.className = 'testcase';
	this.react = React.renderComponent(React.createClass({
		getInitialState: function() {
			return {data: []};
		},
		render: function () {
			return React.DOM.div({className: 'testcase'},
				this.state.data.map(function (d, i) {
					return React.DOM.div({
						key: d.id,
						className: 'one two' + (d.id%2 ? ' three' : ''),
						'data-id': d.id},
						React.DOM.span({className: 'user', 'data-id': d.user.id}, d.user.name),
						React.DOM.span({className: 'text'}, d.text)
					);
				}));
		}
	})({data: this.data}), this.el);
	// XXX: one is forced to render the react component into a node, and one
	// can not render more than one child into a node. :-(
	//this.el = this.react.getDOMNode();
}

ReactKeyed.prototype.stepN = function ReactKeyed_step() {
	this.react.setState({data: this.data.data});
};
