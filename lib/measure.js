/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

module.exports = measure;

if (typeof performance === 'undefined')
	performance = Date;

function measure(fn, name) {
	console.profile && console.profile(name);
	var start = performance.now();
	fn();
	var end = performance.now();
	console.profileEnd && console.profileEnd();
	return end - start;
}

