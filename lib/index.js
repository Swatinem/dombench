/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var Data = require('./data');
var contenders = require('./contenders');
var Results = require('./results');

var closest = require('closest');

// create the contenders
contenders = contenders.contenders.map(function (c) {
	return new contenders.Contender(c, new Data());
});

// create the results view
var resultsView = new Results(new Data(), contenders);
resultsView.render();
document.body.appendChild(resultsView.el);

// create an element to hold the testcases. The browsers optimize too much if
// the elements are not actually visible
var tests = document.createElement('div');
tests.className = 'testcases';
document.body.appendChild(tests);
contenders.forEach(function (c) {
	tests.appendChild(c.contender.el);
});

// bind showing the code
var open;
document.addEventListener('click', function (ev) {
	if (open) {
		open.classList.remove('open');
		open = undefined;
	}
	var cell = closest(ev.target, 'th, td', true);
	if (!cell) return;
	cell.classList.add('open');
	open = cell;
});

// highlight the js
var codeblocks = document.querySelectorAll('pre code');
for (var i = 0; i < codeblocks.length; i++) {
	var el = codeblocks[i];
	hljs.highlightBlock(el);
}

// run the tests
var queue = contenders.slice();
tryNext();

function tryNext() {
	if (!queue.length) return;
	var contender = queue[0];
	if (!contender.nextStep())
		queue.shift();
	resultsView.render();
	setTimeout(tryNext);
}

