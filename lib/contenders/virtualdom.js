/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var v = require('virtualdom');

module.exports = Virtualdom;

function Virtualdom(data) {
	this.data = data;
	function renderOne(d) {
		return {
			tag: 'div',
			//class: ['one', 'two', (d.id%2 ? 'three' : '')],
			attributes: {'data-id': d.id, class: 'one two' + (d.id%2 ? ' three' : '')},
			children: [
				{tag: 'span'/*, class: ['user']*/, attributes: {'data-id': d.user.id, class: 'user'}, children: [d.user.name]},
				{tag: 'span'/*, class: ['text']*/, attributes: {class: 'text'}, children: [d.text]}
			]
		};
	}
	this.render = (function () {
		var data = this.data.data;
		return {tag: 'div', class: ['testcase'], children: data.map(renderOne)};
	}).bind(this);
	this.vdom = this.render();
	this.el = v.toDOM(this.vdom);
}

Virtualdom.prototype.stepN = function Virtualdom_step() {
	var vdom = this.render();
	var diff = v.diff(this.vdom, vdom);
	v.applyPatch(this.el, diff);
	this.vdom = vdom;
};

