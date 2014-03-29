/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var v = require('virtualdom');

module.exports = VirtualdomKeyed;

function VirtualdomKeyed(data) {
	this.data = data;
	this.render = (function () {
		var data = this.data.data;
		return {tag: 'div', class: ['testcase'], children: data.map(function (d, i) {
			return {
				tag: 'div',
				key: d.id,
				class: ['one', 'two', (d.id%2 ? 'three' : '')],
				attributes: {'data-id': d.id},
				children: [
					{tag: 'span', class: ['user'], attributes: {'data-id': d.user.id}, children: [d.user.name]},
					{tag: 'span', class: ['text'], children: [d.text]}
				]
			};
		})};
	}).bind(this);
	this.vdom = this.render();
	this.el = v.toDOM(this.vdom);
}

VirtualdomKeyed.prototype.stepN = function VirtualdomKeyed_step() {
	var vdom = this.render();
	var diff = v.diff(this.vdom, vdom);
	v.applyPatch(this.el, diff);
	this.vdom = vdom;
};

