/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

module.exports = React;

var R = window.React;

function React(data) {
	this.data = data;
	this.el = document.createElement('div');
	this.el.className = 'testcase';
	this.react = R.renderComponent(R.createClass({
		getInitialState: function() {
			return {data: []};
		},
		render: function () {
			return R.DOM.div({className: 'testcase'},
				this.state.data.map(function (d, i) {
					return R.DOM.div({
						className: 'one two' + (d.id%2 ? ' three' : ''),
						'data-id': d.id},
						R.DOM.span({className: 'user', 'data-id': d.user.id}, d.user.name),
						R.DOM.span({className: 'text'}, d.text)
					);
				}));
		}
	})({data: this.data}), this.el);
	// XXX: one is forced to render the react component into a node, and one
	// can not render more than one child into a node. :-(
	//this.el = this.react.getDOMNode();
}

React.prototype.stepN = function React_step() {
	this.react.setState({data: this.data.data});
};
