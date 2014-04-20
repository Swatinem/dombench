/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

module.exports = ReactCached;

var R = window.React;

function ReactCached(data) {
	this.data = data;
	this.el = document.createElement('div');
	this.el.className = 'testcase';
	function renderOne(d) {
		return R.DOM.div({
			key: d.id,
			className: 'one two' + (d.id%2 ? ' three' : ''),
			'data-id': d.id},
			R.DOM.span({className: 'user', 'data-id': d.user.id}, d.user.name),
			R.DOM.span({className: 'text'}, d.text)
		);
	}
	try {
		// ES6 ftw
		var cache = this.cache = new Map();
	} catch (e) { return this; }
	function cached(d) {
		var cached = cache.get(d);
		if (!cached) {
			cached = renderOne(d);
			cache.set(d, cached);
		}
		return cached;
	}
	this.react = R.renderComponent(R.createClass({
		getInitialState: function() {
			return {data: []};
		},
		render: function () {
			return R.DOM.div({className: 'testcase'},
				this.state.data.map(cached));
		}
	})(), this.el);
	// XXX: one is forced to render the react component into a node, and one
	// can not render more than one child into a node. :-(
	//this.el = this.react.getDOMNode();
}

ReactCached.prototype.stepN = function ReactCached_step() {
	if (!this.cache) return;
	this.react.setState({data: this.data.data});
};

ReactCached.prototype.step7 = function ReactCached_step7() {
	if (!this.cache) return;
	// we *know* that `users[0]` changed
	var user = this.data.users[0];
	// so find all the data that has that user
	var modifiedData = this.data.data.filter(function (d) { return d.user === user; });
	// invalidate the cache for it
	var self = this;
	modifiedData.forEach(function (d) { self.cache.delete(d); });
	// and rerender
	this.react.setState({data: this.data.data});
};

