/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var measure = require('./measure');

exports.Contender = Contender;
exports.contenders = [
	require('./contenders/custom'),
	require('./contenders/react'),
	require('./contenders/reactkeyed'),
	require('./contenders/virtualdom'),
	require('./contenders/virtualdomkeyed'),
	require('./contenders/angular'),
];

function Contender(klass, data) {
	this.klass = klass;
	this.name = klass.name;
	this.reset(data);
}

Contender.prototype.reset = function Contender_reset(data) {
	this.data = data;
	this.contender = new this.klass(this.data);
	this.step = 0;
	this.results = [];
};

Contender.prototype.nextStep = function Contender_nextStep() {
	var self = this;
	var step = ++this.step;
	var data = this.data;
	var contender = this.contender;
	if (!data['step' + step] || (!contender['step' + step] && !contender.stepN)) return;
	var result = measure(function () {
		data['step' + step]();
		(contender['step' + step] || contender.stepN).call(contender);
	}, contender.constructor.name + '#step' + step);
	this.results.push(result);
	return result;
};

