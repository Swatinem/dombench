/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var v = require('virtualdom');

module.exports = VirtualdomCached;

function VirtualdomCached(data) {
	this.data = data;
	function renderOne(d) {
		return {
			tag: 'div',
			key: d.id,
			//class: ['one', 'two', (d.id%2 ? 'three' : '')],
			attributes: {'data-id': d.id, class: 'one two' + (d.id%2 ? ' three' : '')},
			children: [
				{tag: 'span'/*, class: ['user']*/, attributes: {'data-id': d.user.id, class: 'user'}, children: [d.user.name]},
				{tag: 'span'/*, class: ['text']*/, attributes: {class: 'text'}, children: [d.text]}
			]
		};
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
	this.render = (function () {
		var data = this.data.data;
		return {tag: 'div', class: ['testcase'], children: data.map(cached)};
	}).bind(this);
	this.vdom = this.render();
	this.el = v.toDOM(this.vdom);
}

VirtualdomCached.prototype.stepN = function VirtualdomCached_step() {
	if (!this.cache) return;
	var vdom = this.render();
	var diff = v.diff(this.vdom, vdom);
	v.applyPatch(this.el, diff);
	this.vdom = vdom;
};

VirtualdomCached.prototype.step7 = function VirtualdomCached_step7() {
	if (!this.cache) return;
	// we *know* that `users[0]` changed
	var user = this.data.users[0];
	// so find all the data that has that user
	var modifiedData = this.data.data.filter(function (d) { return d.user === user; });
	// invalidate the cache for it
	var self = this;
	modifiedData.forEach(function (d) { self.cache.delete(d); });
	// and rerender
	var vdom = this.render();
	var diff = v.diff(this.vdom, vdom);
	v.applyPatch(this.el, diff);
	this.vdom = vdom;
};

