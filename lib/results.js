/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

module.exports = Results;

function Results(data, contenders) {
	this.data = data;
	this.contenders = contenders;
}

Results.prototype.render = function Results_render() {
	var matrix = this.getMatrix();
	renderVdom(this, {
		tag: 'table',
		children: [
			{tag: 'tr', children: [{tag: 'th'}].concat(this.contenders.map(function (c) {
				return {tag: 'th', children: [c.name, codeFor(c.klass)]};
			}))},
			matrix.map(function (r, i) {
				return {tag: 'tr', children: [
					{tag: 'th', children: ['step' + (i + 1), codeFor(r[0].code)]}]
					.concat(r.slice(1).map(function (c) {
						return {tag: 'td', children: [c.result, codeFor(c.code)]};
					}))};
			})
		]
	});
};

Results.prototype.getMatrix = function Results_getMatrix() {
	// TODO: this should be a little clearer
	var i = 1;
	var matrix = [];
	while (this.data['step' + i]) {
		matrix.push([{
			code: this.data['step' + i]
		}].concat(this.contenders.map(function (c) {
			return {
				result: (resultFormat(c.results[i - 1])).toString(),
				code: c.contender['step' + i] || c.contender.stepN
			};
		})));
		i++;
	}
	return matrix;
};

function resultFormat(res) {
	if (!res) return '–';
	return res.toFixed(3) + 'ms';
}

function codeFor(fn) {
	if (!fn) return;
	return [{tag: 'pre', children: [{tag: 'code', children: [fn.toString()]}]}];
}

var v = require('virtualdom');
function renderVdom(obj, vdom) {
	if (!obj.vdom || !obj.el) {
		obj.vdom = vdom;
		obj.el = v.toDOM(vdom);
		return;
	}
	var diff = v.diff(obj.vdom, vdom);
	v.applyPatch(obj.el, diff);
	obj.vdom = vdom;
}

